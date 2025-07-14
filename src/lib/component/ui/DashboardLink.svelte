<script>
	const { to, pathname, children } = $props();
</script>

<li>
	<a href={to} rel="noopener noreferrer" class:active={pathname === to}>
		<div
			class=" hover:text-primary_red flex items-center gap-x-3 rounded-full p-1 px-4 transition duration-200"
		>
			{@render children()}
		</div>
	</a>
</li>

<style>
	.active div {
		background-color: #f001;

		color: var(--color-primary_red);
		font-weight: 600;
	}
</style>
