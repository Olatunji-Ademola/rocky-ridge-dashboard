<script>
	const { color, name, placeholder, isInput = true } = $props();

	const setStyleVariableColot = (node, value) => {
		node.style.setProperty(`--color`, value);
	};
</script>

{#if isInput}
	<input
		use:setStyleVariableColot={color}
		required
		type="text"
		{name}
		{placeholder}
		class="rounded border border-transparent p-2 outline-none"
	/>
{:else}
	<!-- rows="10" -->
	<textarea
		use:setStyleVariableColot={color}
		required
		{name}
		{placeholder}
		class="text-gra gray max-h-92 min-h-46 rounded border border-transparent p-2 outline-none disabled:resize-none"
	></textarea>
{/if}

<style>
	input,
	textarea {
		background: color-mix(in oklab, var(--color) 5%, transparent);

		border-color: color-mix(in oklab, var(--color) 30%, transparent);

		color: var(--color);
	}
	input:focus,
	textarea:focus {
		border-color: color-mix(in oklab, var(--color) 35%, transparent);
	}

	input::placeholder,
	textarea::placeholder {
		color: color-mix(in oklab, var(--color) 60%, transparent);
	}
	input:disabled,
	textarea:disabled {
		background-color: #d1d5dc33;
		border-color: #d1d5dc;
	}
	input:disabled::placeholder,
	textarea:disabled::placeholder {
		color: #99a1af;
	}
</style>
