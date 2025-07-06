<script>
	const { data } = $props();
</script>

<main class="w-fit p-4">
	<h2 class="text-xl font-bold">
		Welcome {data['Student Name']}
	</h2>
	<p>to the Rocky Ridge Music dashboard</p>

	<div class="mt-10">
		<h2 class="font-bold">Your Data:</h2>
		<div class="border border-gray-300 *:odd:bg-gray-100">
			{#each Object.keys(data) as key}
				<div class="flex gap-4 p-2">
					<div>{key}</div>
					<span>:</span>
					<div>{data[key]}</div>
				</div>
			{/each}
		</div>
	</div>
</main>
