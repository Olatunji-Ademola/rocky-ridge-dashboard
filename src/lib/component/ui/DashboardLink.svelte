<script>
	const { to, pathname, children } = $props();
</script>

<li>
	<a href={to} rel="noopener noreferrer" class:active={pathname === to}>
		<div
			class=" flex items-center gap-x-1.5 rounded-t-lg p-1 px-4 text-white transition duration-300 hover:bg-cyan-900/40"
		>
			{@render children()}
		</div>
	</a>
</li>

<style>
	.active div {
		background-color: white;
		color: var(--color-primary_green);
		font-weight: 600;
	}
</style>
