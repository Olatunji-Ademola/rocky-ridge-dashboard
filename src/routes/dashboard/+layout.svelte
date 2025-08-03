<script>
	import {
		AwardSolid,
		BarsSolid,
		CalendarCheckRegular,
		CalendarRegular,
		ClockRegular,
		HouseSolid,
		MapRegular,
		ScrewdriverWrenchSolid,
		SpinnerSolid,
		XmarkSolid,
		XSolid
	} from 'svelte-awesome-icons';

	import { page } from '$app/stores';
	import DashboardLink from '$lib/component/ui/DashboardLink.svelte';
	import UserInfoPopup from '$lib/component/ui/UserInfoPopup.svelte';
	import { json } from '@sveltejs/kit';
	import {
		clearTimeSheetHours,
		getIsUserActive,
		getPopupMessage,
		getTimeSheetModelData,
		hideTimeSheetModel,
		setIsUserActive,
		setPopupMessage,
		setPresentTime,
		setTimeSheetList,
		setUserSchedule
	} from './store.svelte.js';
	import Notification from '$lib/component/ui/Notification.svelte';
	import { enhance } from '$app/forms';
	const { data, children, url, form } = $props();

	let menuOpen = $state(false);
	let dataLoaded = $state(false);

	let menuRef = null;
	let menuFillerRef = null;

	let iAgreeChecked = $state(false);
	let isSubmittingTimesheet = $state(false);

	$effect(async () => {
		let UserSessions = data['Session'].split(',').map((value) => value.trim());
		try {
			const res = await fetch('/dashboard/api/presentSession');
			const sessionData = await res.json();
			const { presentSession, allSessionList, presentTime } = sessionData;

			setPresentTime(presentTime);

			// list of session the user is active for

			// check if the user have access to the present session
			const isUserActive = UserSessions.includes(presentSession);

			// set user session schedule
			let userSchedule = '';
			if (isUserActive) {
				userSchedule = presentSession;
			} else {
				if (allSessionList.includes(presentSession)) {
					let avaliableSessions = [];

					// get all the sessiom prior to the present session
					for (let i = 0; i < allSessionList.length; i++) {
						if (allSessionList[i] == presentSession) break;
						avaliableSessions.push(allSessionList[i]);
					}

					// get the latest session in the list of avaliableSessions is uesr is active
					UserSessions.forEach((value) => {
						if (avaliableSessions.includes(value)) userSchedule = value;
					});

					// if no session is avaliable to the user pick the user frist active session
					if (!userSchedule) userSchedule = UserSessions[0];
				} else {
					userSchedule = UserSessions[0];
				}
			}

			// set global state
			setIsUserActive(isUserActive);
			setUserSchedule(userSchedule);
			dataLoaded = true;
		} catch (err) {
			dataLoaded = true;
			setUserSchedule(UserSessions[0]);
		}
	});

	$effect(async () => {
		if (menuOpen) {
			menuRef.classList.remove('hidden');
			menuFillerRef.classList.remove('hidden');
		} else {
			menuRef.classList.add('hidden');
			menuFillerRef.classList.add('hidden');
		}
	});

	const openMenu = () => {
		menuOpen = true;
	};
	const closeMenu = () => {
		menuOpen = false;
	};

	$effect(async () => {
		const pathname = $page.url.pathname;

		if (
			pathname === '/dashboard/time-sheet' &&
			!(data['role'] === 'Staff' || (data['role'] === 'Student' && data['Employee'] === 'TRUE'))
		) {
			await fetch('/dashboard/api/goHome');
		}

		if (pathname === '/dashboard/paper-plate-nomination' && data['role'] !== 'Student') {
			await fetch('/dashboard/api/goHome');
		}
	});
</script>

<div class="relative flex h-svh flex-col lg:flex-row">
	<aside
		bind:this={menuRef}
		class="absolute top-12 right-5 z-50 hidden min-w-69 overflow-hidden rounded-2xl border-r border-gray-500 border-r-gray-200 bg-white p-4 text-sm shadow-lg lg:static lg:block lg:h-full lg:rounded-none"
	>
		<div class=" hidden border-b border-b-gray-200 lg:block">
			<div class="flex items-center gap-2">
				<h2 class="text-2xl font-bold">
					{data['Name']}
				</h2>
				<div
					class="h-3 w-3 rounded-full {getIsUserActive() ? 'bg-green-400' : 'bg-gray-300'}"
				></div>
			</div>
			<p class="text-sm text-gray-500">Welcome</p>
		</div>
		<div class=" lg:mt-20">
			<h3 class="text-gray-400">Dash menu</h3>
			<ul class=" mr-4 text-gray-600 capitalize *:mt-6">
				<DashboardLink to="/dashboard" color="#ff5266" pathname={$page.url.pathname}>
					<HouseSolid size="16" class="text-primary_red opacity-70" />
					<p>home</p>
				</DashboardLink>
				<DashboardLink to="/dashboard/schedule" color="#007775" pathname={$page.url.pathname}>
					<CalendarRegular size={16} class="text-primary_green opacity-70" />
					<p>schedule</p>
				</DashboardLink>
				<DashboardLink to="/dashboard/map" color="#f89e1e" pathname={$page.url.pathname}>
					<MapRegular size={16} class="text-primary_yellow opacity-70" />
					<p>campus map</p>
				</DashboardLink>
				{#if data['role'] === 'Staff' || (data['role'] === 'Student' && data['Employee'] === 'TRUE')}
					<DashboardLink to="/dashboard/time-sheet" color="#007775" pathname={$page.url.pathname}>
						<ClockRegular size={16} class="text-primary_green opacity-70" />
						<p>time sheet</p>
					</DashboardLink>
				{/if}

				<DashboardLink
					to="/dashboard/maintenance-request"
					color="#ff5266"
					pathname={$page.url.pathname}
				>
					<ScrewdriverWrenchSolid size={16} class="text-primary_red opacity-70" />
					<p>maintenance request</p>
				</DashboardLink>
				{#if data['role'] === 'Student'}
					<DashboardLink
						to="/dashboard/paper-plate-nomination"
						color="#f89e1e"
						pathname={$page.url.pathname}
					>
						<AwardSolid size={16} class="text-primary_yellow opacity-70" />
						<p>paper plate nomination</p>
					</DashboardLink>
				{/if}
			</ul>
		</div>
	</aside>
	<button
		bind:this={menuFillerRef}
		onclick={closeMenu}
		type="button"
		aria-label="closeMenu"
		id="menuFiller"
		class="absolute inset-0 z-40 hidden bg-black/10 lg:hidden"
	></button>

	<div class="flex justify-between border-b border-gray-300 p-4 text-gray-500 lg:hidden">
		<h2>
			Welcome <span class="font-bold">{data['Name']}</span>
		</h2>
		<button type="button" onclick={openMenu}>
			{#if menuOpen}
				<XmarkSolid />
			{:else}
				<BarsSolid />
			{/if}
		</button>
	</div>

	{#if getPopupMessage()}
		<Notification {...getPopupMessage()} />
	{/if}
	<main class="relative grow overflow-auto bg-gray-50">
		<!-- map | home -->
		{#if $page.url.pathname == '/dashboard' || $page.url.pathname == '/dashboard/map' || dataLoaded}
			{@render children()}
		{/if}
	</main>
</div>
{#if getTimeSheetModelData()}
	<div class="absolute inset-0 z-50 flex items-center justify-center bg-white sm:bg-gray-100">
		<div class="bg-white p-4 sm:w-md sm:rounded sm:shadow-md">
			<h2 class="text-lg font-bold">Time Sheet Submission Agreement</h2>
			<p class="my-3 text-gray-700">Before submitting, please confirm the following:</p>
			<ul
				class="*:before:bg-primary_red/40 text-sm text-gray-600 *:mt-3 *:flex *:gap-2 *:before:mt-1.5 *:before:block *:before:size-2 *:before:shrink-0 *:before:rounded-full"
			>
				<li>I certify that the hours entered are accurate and complete.</li>

				<li>
					I understand that false or late submissions may result in delayed pay or disciplinary
					action.
				</li>

				<li>I agree to follow all time reporting policies as required by the company.</li>
			</ul>

			<div class="mt-4 flex items-center gap-2">
				<p>I agree to all</p>
				<input type="checkbox" class="size-4" bind:checked={iAgreeChecked} />
			</div>

			<div class="mt-10 flex gap-2">
				<button
					onclick={hideTimeSheetModel}
					class="bg-primary_red cursor-pointer rounded p-2 px-10 text-white">Cancle</button
				>
				<form
					action="?/submitTimeSheet"
					method="post"
					use:enhance={({ formData }) => {
						const { Name, Email, Position, Hours, minDate, maxDate } = getTimeSheetModelData();

						formData.append('Name', Name);
						formData.append('Email', Email);
						formData.append('Start Date', minDate);
						formData.append('End Date', maxDate);
						formData.append('Position', Position);
						formData.append('Hours', Hours);
						formData.append('isActive', getIsUserActive());

						isSubmittingTimesheet = true;

						return async ({ update }) => {
							await update();

							isSubmittingTimesheet = false;
							hideTimeSheetModel();

							if (form?.successMessage) {
								setPopupMessage(form.successMessage, 'success');
								clearTimeSheetHours();

								setTimeSheetList([
									{
										StartDate: form.data.StartDate,
										EndDate: form.data.EndDate,
										Hours: form.data.Hours
									}
								]);
							} else if (form?.errorMessage) setPopupMessage(form.errorMessage, 'error');
						};
					}}
				>
					<button
						disabled={isSubmittingTimesheet || !getIsUserActive() || !iAgreeChecked}
						class="bg-primary_red cursor-pointer rounded p-2 px-4 text-white disabled:bg-gray-400"
					>
						{#if isSubmittingTimesheet}
							<span class="flex items-center gap-2">
								<p>Submitting Timesheet</p>
								<SpinnerSolid size={20} class="spinner animate-loading mx-auto" />
							</span>
						{:else}
							Submit Timesheet
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	* {
		font-family: 'Poppins', sans-serif;
	}
</style>
