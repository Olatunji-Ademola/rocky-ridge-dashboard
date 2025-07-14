<script>
	const { data } = $props();
	// const { calendarData,  } = data;
	const { calendarBody, calendarHead, calendarTitle } = data.calendarData;
</script>

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
