<script>
	import { enhance } from '$app/forms';
	import { AngleDownSolid, AngleUpSolid, SpinnerSolid } from 'svelte-awesome-icons';
	import {
		deleteTimeSheetHours,
		getIsUserActive,
		getTimeSheetHours,
		setPopupMessage,
		setTimeSheetHours
	} from '../../routes/dashboard/store.svelte';
	import { MonthList } from '$lib/utilities.svelte';
	import { fade } from 'svelte/transition';

	const { calenderMonth, goUpMonth, goDownMonth, email, year, month, form } = $props();

	let isFadeUp = $state(false);
	let isFadeDown = $state(false);

	let isSubmitting = $state(false);
	let isClearing = $state(false);
	let selectedDay = $state('');
	let selectedHours = $state('');
	const selecteDay = (dayData) => {
		if (dayData) {
			selectedDay = dayData['date'];
			selectedHours = dayData['hours'];
		} else {
			selectedDay = '';
			selectedHours = '';
		}
	};
</script>

<div class="mt-10 w-fit">
	<div class="flex justify-between">
		<div class="text-gray-500">{MonthList[month - 1]} {year}</div>
		<div class="flex gap-4">
			<button
				type="button"
				onclick={() => {
					isFadeUp = false;
					isFadeDown = false;
					setTimeout(() => {
						isFadeUp = true;
					}, 0);

					goDownMonth();
				}}
				class="cursor-pointer rounded-full p-3 text-gray-500 hover:bg-gray-100"
			>
				<AngleUpSolid size="20" />
			</button>
			<button
				type="button"
				onclick={() => {
					isFadeUp = false;
					isFadeDown = false;
					setTimeout(() => {
						isFadeDown = true;
					}, 0);
					goUpMonth();
				}}
				class="cursor-pointer rounded-full p-3 text-gray-500 hover:bg-gray-100"
			>
				<AngleDownSolid size="20" />
			</button>
		</div>
	</div>
	<table>
		<thead>
			<tr class=" font-bold text-gray-700">
				<td>SUN</td>
				<td>MON</td>
				<td>TUE</td>
				<td>WED</td>
				<td>THU</td>
				<td>FRI</td>
				<td>SAT</td>
			</tr>
		</thead>
		<tbody class="text-sm text-neutral-700">
			{#each calenderMonth as row}
				<tr class:fadeUp={isFadeUp} class:fadeDown={isFadeDown}>
					{#each row as dayData}
						{#if dayData['isActive']}
							{#if dayData['isDone']}
								<td
									class:startDone={dayData['startDone']}
									class:endDone={dayData['endDone']}
									onclick={(e) => {
										selecteDay('');
									}}
									class="relative cursor-default bg-gray-100 text-gray-500"
								>
									{dayData['day']}
								</td>
							{:else}
								<td
									class:active={dayData['date'] == selectedDay}
									class:asHours={dayData['hours']}
									class="group hover:!bg-primary_red/80 cursor-pointer rounded hover:!text-white"
									data-tag={dayData['date']}
									onclick={(e) => {
										selecteDay(dayData);
									}}
								>
									<p>
										{dayData['day']}
									</p>
									{#if dayData['hours']}
										<p class="text-primary_red/80 text-xs font-normal group-hover:text-white">
											{dayData['hours']}h
										</p>
									{/if}
								</td>
							{/if}
						{:else}
							<td
								onclick={(e) => {
									selecteDay('');
								}}
								class="cursor-default text-gray-400"
							>
								{dayData['day']}
							</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if selectedDay}
	<form
		action="?/addHours"
		method="post"
		class=" flex w-fit flex-col"
		use:enhance={({ formData, action }) => {
			formData.append('Email', email);
			formData.append('Date', selectedDay);
			formData.append('isUpdate', !!selectedHours);
			formData.append('isActive', getIsUserActive());

			if (action.search === '?/clearHours') isClearing = true;
			isSubmitting = true;

			return async ({ update }) => {
				await update();

				if (form?.successMessage) {
					setPopupMessage(form.successMessage, 'success');
					let sheetHours = {};

					const key = form.date;
					const value = form.hours;

					if (form.cleared) {
						deleteTimeSheetHours(key);
					} else {
						sheetHours[key] = value;
						setTimeSheetHours(sheetHours);
					}

					for (let i = 0; i < calenderMonth.length; i++) {
						const dayRow = calenderMonth[i];
						for (let d = 0; d < dayRow.length; d++) {
							const aDayData = dayRow[d];

							if (aDayData['date'] === key) {
								selecteDay(aDayData);
								break;
							}
						}
					}
				} else if (form?.errorMessage) setPopupMessage(form.errorMessage, 'error');

				isSubmitting = false;
				isClearing = false;
			};
		}}
	>
		<fieldset disabled={!getIsUserActive()}>
			<input
				type="number"
				name="Hours"
				disabled={isSubmitting}
				required
				value={selectedHours}
				placeholder="0.0"
				min="1"
				step="0.1"
				class="text-primary_red border-primary_red/20 bg-primary_red/10 mb-2 w-28 [appearance:textfield] rounded border p-2 pl-4 text-center outline-none disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			/>

			<div>
				<button
					disabled={isSubmitting}
					class="bg-primary_red cursor-pointer rounded p-2 px-4 text-white disabled:bg-gray-400"
				>
					{#if selectedHours}
						{#if isSubmitting && !isClearing}
							<span class="flex items-center gap-2">
								<p>Updating hours</p>
								<SpinnerSolid size={20} class="spinner animate-loading mx-auto" />
							</span>
						{:else}
							Update hours
						{/if}
					{:else if isSubmitting}
						<span class="flex items-center gap-2">
							<p>Adding hours</p>
							<SpinnerSolid size={20} class="spinner animate-loading mx-auto" />
						</span>
					{:else}
						Add hours
					{/if}
				</button>
				{#if selectedHours}
					<button
						disabled={isSubmitting}
						formaction="?/clearHours"
						class="bg-primary_red cursor-pointer rounded p-2 px-4 text-white disabled:bg-gray-400"
					>
						{#if isSubmitting && isClearing}
							<span class="flex items-center gap-2">
								<p>Clearing hours</p>
								<SpinnerSolid size={20} class="spinner animate-loading mx-auto" />
							</span>
						{:else}
							Clear hours
						{/if}
					</button>
				{/if}
			</div>
		</fieldset>
	</form>
{:else}
	<div class="">
		<div
			class="mb-2 w-28 rounded border border-gray-300 bg-gray-100 p-2 pl-4 text-center text-gray-400"
		>
			0.0
		</div>
		<div class=" w-fit cursor-pointer rounded bg-gray-400 p-2 px-4 text-white">Add hours</div>
	</div>
{/if}

<style>
	table {
		border-collapse: separate;
	}
	td {
		width: 60px;
		height: 60px;
		text-align: center;
	}
	.active {
		background-color: color-mix(in oklab, var(--color-primary_red) 80%, transparent) !important;
	}

	.active p {
		color: white !important;
	}
	.asHours {
		position: relative;
		font-weight: bold;
		background-color: color-mix(in oklab, var(--color-primary_red) 8%, transparent);
		color: var(--color-primary_red);
		border-radius: 0px 0px 10px 0px;
	}
	.asHours::before {
		content: '';
		display: block;
		position: absolute;
		background-color: var(--color-primary_red);
		left: 0;
		right: 0;
		top: 0;
		height: 2px;
	}

	.startDone::before,
	.endDone::before {
		content: '';
		display: block;

		width: 0;
		height: 0;

		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin: auto 0;

		border-top: 8px solid transparent;
		border-bottom: 8px solid transparent;
	}

	.startDone::after,
	.endDone::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		background-color: #ccc;
	}

	.endDone::after {
		right: 0;
	}

	.startDone::before {
		border-left: 10px solid #ccc;
	}

	.endDone::before {
		right: 0;
		border-right: 10px solid #ccc;
	}

	/* calendar down animation */
	.fadeDown {
		animation: fadeDownAnim 0.3s ease-in-out;
	}
	@keyframes fadeDownAnim {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	/* calendar up animation */
	.fadeUp {
		animation: fadeUpAnim 0.3s ease-in-out;
	}

	@keyframes fadeUpAnim {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}
</style>
