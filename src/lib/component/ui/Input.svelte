<script>
	const { color, placeholder, isInput = true } = $props();

	// console.log(color);
	const text_color = 'green';

	const setStyleVariableColot = (node, value) => {
		node.style.setProperty(`--color`, value);
	};
</script>

{#if isInput}
	<input
		use:setStyleVariableColot={color}
		type="text"
		id="UserInput"
		class="rounded border border-transparent p-2 outline-none"
		{placeholder}
	/>
{:else}
	<textarea
		use:setStyleVariableColot={color}
		name=""
		id="UserInput"
		rows="10"
		{placeholder}
		class=" rounded border border-transparent p-2 outline-none"
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
