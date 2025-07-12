<script>
	const { to, pathname, children } = $props();

	// console.log(to, pathname);
</script>

<li>
	<a href={to} rel="noopener noreferrer" class:active={pathname === to}>
		<div class="flex items-center gap-4">
			{@render children()}
		</div>
	</a>
</li>

<style>
	.active {
		color: var(--color-primary_red);
	}
</style>
