<script>
	const { to, pathname, color = '#f00', children } = $props();

	const addBackgroundColor = (node, value) => {
		node.style.setProperty(`--color`, value);
	};
</script>

<li>
	<a href={to} rel="noopener noreferrer" class:active={pathname === to}>
		<div
			use:addBackgroundColor={color}
			class="  flex items-center gap-x-3 rounded-full p-1 px-4 transition duration-200"
		>
			{@render children()}
		</div>
	</a>
</li>

<style>
	.active div,
	div:hover {
		background-color: color-mix(in oklab, var(--color) 10%, transparent);
		color: var(--color);
	}
</style>
