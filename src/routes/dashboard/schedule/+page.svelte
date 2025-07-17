<script>
	import { SpinnerSolid, TriangleExclamationSolid } from 'svelte-awesome-icons';
	import { getCalendarData, getUserSchedule, setCalendarData } from '../store.svelte';
	import { json } from '@sveltejs/kit';

	let calendarTitle = $state(null);
	let calendarHead = $state(null);
	let calendarBody = $state(null);

	let loadingCalendar = $state(false);

	$effect(async () => {
		const calendarData = getCalendarData();

		if (calendarData) {
			calendarTitle = calendarData.calendarTitle;
			calendarHead = calendarData.calendarHead;
			calendarBody = calendarData.calendarBody;
		} else {
			loadingCalendar = true;

			try {
				const schedule = getUserSchedule();

				const res = await fetch('/dashboard/schedule', {
					method: 'POST',
					body: JSON.stringify({ schedule }),
					headers: { 'Content-Type': 'application/json' }
				});

				const data = await res.json();
				setCalendarData(data);
			} catch (e) {}

			loadingCalendar = false;
		}
	});
</script>

{#if loadingCalendar}
	<div class="flex h-full w-full items-center justify-center">
		<div class="flex items-center gap-2 *:!text-base *:!text-gray-400">
			<div>Loading schedule</div>
			<SpinnerSolid size={20} class="spinner animate-loading" />
		</div>
	</div>
{:else if calendarBody}
	<div class="m-auto w-fit 2xl:p-6">
		<h1 class=" !text-primary_green my-4 text-center !text-xl font-bold">{calendarTitle}</h1>
		<table>
			<thead>
				<tr>
					{#each calendarHead as head}
						<th>
							{head}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each calendarBody as calendarRow}
					<tr>
						{#each calendarRow as calendarCell}
							<td> {calendarCell} </td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<div class="flex h-full items-center justify-center">
		<div class=" flex w-fit flex-col items-center gap-2 text-center *:!text-base *:!text-amber-500">
			<TriangleExclamationSolid />
			<div>
				No schedule loaded <br /> try refreshing
			</div>
		</div>
	</div>
{/if}

<style>
	* {
		font-size: small;
		color: #444;
	}
	table {
		background-color: whitesmoke;
	}
	th {
		color: white;
		padding: 6px;
		position: sticky;
		top: 0;
		background-color: var(--color-primary_green);
		font-weight: 500;
		z-index: 1;
	}
	thead > tr {
		border: none;
	}
	tr {
		border: 1px solid color-mix(in oklab, var(--color-primary_green) 20%, transparent);
	}
	td:nth-child(1) {
		width: 100px;
		color: var(--color-primary_green);
		text-align: center;
		position: sticky;
		background-color: whitesmoke;
		left: 0;
	}
	td {
		width: 200px;
		padding: 10px;
	}
	td:nth-child(even) {
		background-color: #fff9;
	}
</style>
