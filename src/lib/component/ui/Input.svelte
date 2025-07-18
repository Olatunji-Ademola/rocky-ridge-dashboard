<script>
	const { color, name, placeholder, isInput = true } = $props();

	const setStyleVariableColot = (node, value) => {
		node.style.setProperty(`--color`, value);
	};
</script>

{#if isInput}
	<input
		use:setStyleVariableColot={color}
		type="text"
		id="UserInput"
		{name}
		{placeholder}
		class="rounded border border-transparent p-2 outline-none"
	/>
{:else}
	<!-- rows="10" -->
	<textarea
		use:setStyleVariableColot={color}
		id="UserInput"
		{name}
		{placeholder}
		class="max-h-92 min-h-46 rounded border border-transparent p-2 outline-none"
	></textarea>
{/if}

<style>
	#UserInput {
		background: color-mix(in oklab, var(--color) 2.5%, transparent);

		border-color: color-mix(in oklab, var(--color) 15%, transparent);

		color: var(--color);
	}
	#UserInput:focus {
		border-color: color-mix(in oklab, var(--color) 35%, transparent);
	}

	input::placeholder {
		color: color-mix(in oklab, var(--color) 40%, transparent);
	}
</style>
