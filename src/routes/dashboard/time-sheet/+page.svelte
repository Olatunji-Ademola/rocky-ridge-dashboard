<script>
	const { data, form } = $props();
	import {
		clearTimeSheetHours,
		getIsUserActive,
		getPresentTime,
		getTimeSheetHours,
		getTimeSheetList,
		setPopupMessage,
		setTimeSheetHours,
		setTimeSheetList,
		showTimeSheetModel
	} from '../store.svelte';
	import { onMount } from 'svelte';
	import Calendar from '$lib/component/Calendar.svelte';
	import { enhance } from '$app/forms';
	import { MonthList } from '$lib/utilities.svelte';
	import { SpinnerSolid } from 'svelte-awesome-icons';

	const todayDate = getPresentTime();

	const [todayMonth, todayDay, todayYear] = todayDate.split('/');

	// get all days in the month
	// check if any of the days(date) match any data(like done or saved)
	// show the appoprate styling

	let isLoadingTimesheet = $state(false);
	let month = $state(Number(todayMonth));
	let year = $state(Number(todayYear));

	let totalWorkedHours = $state(0);
	let fromDate = $state('');
	let toDate = $state('');

	const arrayOutOfNumAmount = (num) => {
		let numArr = [];
		for (let i = 1; i <= num; i++) {
			numArr.push(i);
		}
		return numArr;
	};

	const getTimeSheetHistory = () => {
		const timeHistory = {};

		if (getTimeSheetList()) {
			const timeSheetList = getTimeSheetList();

			let lastKey = '';
			for (let i = 0; i < timeSheetList.length; i++) {
				const timeSheet = timeSheetList[i];
				const [_month, _day, _year] = timeSheet.EndDate.split('/');

				const key = `${MonthList[_month - 1]} ${_year}`;

				if (key !== lastKey) {
					timeHistory[key] = [];
					lastKey = key;
				}

				timeHistory[key].push({
					date: timeSheet.StartDate + ' - ' + timeSheet.EndDate,
					hours: timeSheet.Hours
				});
			}
		}
		return timeHistory;
	};

	let timeSheetHistory = $derived.by(() => getTimeSheetHistory());

	const generateCalendarMonth = (month, year) => {
		let monthDaysData = [];
		// get the amount of days in the month
		const numbersOfDaysInMonth = new Date(year, month, 0).getDate();
		const numbersOfDaysInLastMonth = new Date(year, month - 1, 0).getDate();

		const numbersOfDaysInMonthArr = arrayOutOfNumAmount(numbersOfDaysInMonth);
		// get the begining day of the month if it's a monday = 1, wednesday = 3 ...
		const startDayNum = new Date(`${month}/1/${year}`).getDay();

		let startGap = startDayNum;
		let endDaysIncreament = 0;

		const sheetHoursData = getTimeSheetHours() || {};
		const timeSheetList = getTimeSheetList() || [];
		for (let row = 0; row < 6; row++) {
			monthDaysData.push([]);
			for (let col = 0; col < 7; col++) {
				if (startGap > 0) {
					startGap--;
					monthDaysData[row][col] = { day: numbersOfDaysInLastMonth - startGap, isActive: false };
					continue;
				}

				// make day data
				const day = numbersOfDaysInMonthArr.shift();

				if (day) {
					const date = `${month}/${day}/${year}`;

					// kown if this date is important
					const hours = sheetHoursData[date] || null;

					let isDone = false;
					let startDone = false;
					let endDone = false;

					for (let i = 0; i < timeSheetList.length; i++) {
						const timeSheet = timeSheetList[i];

						const startDate = new Date(timeSheet['StartDate']);
						const endDate = new Date(timeSheet['EndDate']);
						const thisDate = new Date(date);

						if (thisDate >= startDate && thisDate <= endDate) {
							if (!(thisDate > startDate)) startDone = true;
							else if (!(thisDate < endDate)) endDone = true;

							isDone = true;
						}
					}

					monthDaysData[row][col] = {
						day,
						isActive: true,
						date,
						hours,
						isDone,
						startDone,
						endDone
					};
				} else {
					// days  that comes after the month as ended
					endDaysIncreament++;
					monthDaysData[row][col] = {
						day: endDaysIncreament,
						isActive: false
					};
				}
			}
		}

		return monthDaysData; //all the days data
	};

	const getSheetTimeData = () => {
		let totalHours = 0;
		let minDate = '';
		let maxDate = '';

		if (getTimeSheetHours()) {
			const timeSheetHours = getTimeSheetHours();
			const dateKeys = Object.keys(timeSheetHours);

			for (let i = 0; i < dateKeys.length; i++) {
				const key = dateKeys[i];
				const num = Number(timeSheetHours[key]);

				if (i > 0) {
					if (new Date(key) < new Date(minDate)) {
						// mindate
						minDate = key;
					} else if (new Date(key) > new Date(minDate)) {
						// maxdate
						maxDate = key;
					}
				} else {
					minDate = key;
					maxDate = key;
				}

				totalHours += num;
			}
		}

		return { minDate, maxDate, totalHours };
	};

	const goUpMonth = () => {
		month += 1;

		if (month > 12) {
			month = 1;
			year += 1;
		}
	};
	const goDownMonth = () => {
		month -= 1;

		if (month < 1) {
			month = 12;
			year -= 1;
		}
	};

	let calenderMonth = $derived.by(() => {
		return generateCalendarMonth(month, year);
	});

	let { minDate, maxDate, totalHours } = $derived.by(() => {
		return getSheetTimeData();
	});
	// }

	$effect(async () => {
		if (!getTimeSheetHours() && !getTimeSheetList()) {
			try {
				isLoadingTimesheet = true;
				const res = await fetch('/dashboard/time-sheet', {
					method: 'POST',
					body: JSON.stringify({ email: data['Email'] }),
					headers: { 'Content-Type': 'application/json' }
				});

				const { timeSheetHours, timeSheetList } = await res.json();

				setTimeSheetHours(timeSheetHours);
				setTimeSheetList(timeSheetList);
			} catch (err) {
			} finally {
				isLoadingTimesheet = false;
			}
		}
	});

	const showTimeSheetModelHandler = () => {
		const formData = {
			Name: data['Name'],
			Email: data['Email'],
			minDate,
			maxDate,
			Position: data['Position'] || 'Work Study',
			Hours: totalHours
		};

		showTimeSheetModel(formData);
	};
</script>

<main class="w-full sm:p-4">
	<div class="flex flex-col gap-4 xl:flex-row">
		<div class="mx-auto w-fit lg:mx-0">
			<div class="relative w-fit rounded bg-white p-4 sm:shadow-md">
				<!-- overlay -->

				<div
					class:hidden={!isLoadingTimesheet}
					class="absolute inset-0 flex items-center bg-gray-200/50"
				>
					<div class="m-auto flex justify-center gap-4 rounded bg-white p-1 px-4 text-gray-400">
						<p>Loading timesheet</p>
						<SpinnerSolid size={20} class="spinner animate-loading" />
					</div>
				</div>
				<Calendar
					{calenderMonth}
					{goUpMonth}
					{goDownMonth}
					{month}
					{year}
					{form}
					email={data['Email']}
				/>
			</div>
			{#if totalHours}
				<div
					class=" mt-4 flex flex-col justify-between gap-4 rounded bg-white p-4 sm:flex-row sm:shadow-md"
				>
					<div class="flex flex-col gap-1 text-gray-600">
						<p>
							From: <span class="rounded-md bg-gray-100 px-3 text-sm text-gray-400">
								{minDate}
							</span>
						</p>
						<p>
							To: <span class="rounded-md bg-gray-100 px-3 text-sm text-gray-400"> {maxDate} </span>
						</p>
						<p>
							Total Hours: <span class="rounded-md bg-gray-100 px-3 text-sm text-gray-400">
								{totalHours} hours
							</span>
						</p>
					</div>

					<div class="mt-auto">
						<button
							type="button"
							onclick={showTimeSheetModelHandler}
							class="bg-primary_red cursor-pointer rounded p-2 px-4 text-white"
						>
							Submit Timesheet
						</button>
					</div>
				</div>
			{/if}
		</div>

		<div class="mt-10 h-fit grow-1 bg-white p-4 sm:mt-0 sm:rounded sm:shadow-md">
			<h2 class="mb-2 text-xl font-bold text-gray-600">Timesheet History</h2>
			<div class="flex flex-col-reverse">
				{#if isLoadingTimesheet}
					<div class="flex gap-2 p-2 text-sm text-gray-400">
						<p>Loading timesheet history</p>
						<SpinnerSolid size={20} class="spinner animate-loading" />
					</div>
				{:else if Object.keys(timeSheetHistory).length}
					{#each Object.keys(timeSheetHistory) as key}
						<div>
							<div class="py-2 text-sm font-bold text-gray-500">
								{key}
							</div>
							<div class="flex flex-col-reverse">
								{#each timeSheetHistory[key] as value}
									<div
										class="border-primary_red/15 flex justify-between border-t p-2 text-sm text-gray-400"
									>
										<div>
											{value.date}
										</div>
										<div>Total hours {value.hours}</div>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				{:else}
					<div class="p-2 text-sm text-gray-400">No timesheet submitted yet</div>
				{/if}
			</div>
		</div>
	</div>
</main>
