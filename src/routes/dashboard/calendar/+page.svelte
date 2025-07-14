<script>
	import { SpinnerSolid, TriangleExclamationSolid } from 'svelte-awesome-icons';
	import { getCalendarData, setCalendarData } from '../store.svelte';

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
				const res = await fetch('/dashboard/calendar');
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
			<div>Loading calendar</div>
			<SpinnerSolid size={20} class="spinner animate-loading" />
		</div>
	</div>
{:else if calendarBody}
	<div class="m-auto w-fit p-6">
		<h1 class=" my-4 text-center !text-xl font-bold">{calendarTitle}</h1>
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
				No calendar loaded <br /> try refreshing
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
		background-color: #f8f3ef;
	}
	th {
		color: var(--color-primary_green);
		padding: 6px;
		position: sticky;
		top: 0;
		background-color: #faddb4;
		font-weight: 500;
	}
	thead > tr {
		border: none;
	}
	tr {
		border: 1px solid #f7c68377;
	}
	td:nth-child(1) {
		width: 100px;
		color: var(--color-primary_green);
		text-align: center;
	}
	td {
		width: 200px;
		padding: 10px;
	}
	td:nth-child(even) {
		background-color: #fff8;
	}
</style>
