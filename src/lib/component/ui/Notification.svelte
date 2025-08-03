<script>
	import { CheckSolid, CircleExclamationSolid, InfoSolid } from 'svelte-awesome-icons';

	const { title, message, type } = $props();
	let color = '';

	switch (type) {
		case 'error':
			color = 'bg-red-400';
			break;
		case 'success':
			color = 'bg-green-400';
			break;
		default:
			color = 'bg-blue-400';
			break;
	}
</script>

<div
	id="notify"
	class="absolute top-0 left-1/2 z-100 flex min-w-64 -translate-x-1/2 gap-3 rounded-xl p-4 text-sm text-white {color}"
>
	<!-- <div class="flex gap-2"> -->
	<div>
		{#if type == 'success'}
			<CheckSolid size="20" />
		{:else}
			<CircleExclamationSolid size="20" />
		{/if}
	</div>
	<div>
		{message}
	</div>
	<!-- </div> -->
</div>

<style>
	#notify {
		animation: slideIn 4s ease-in;
	}
	@keyframes slideIn {
		100%,
		0% {
			transform: translateY(-100%);
			opacity: 0;
		}
		80%,
		10% {
			transform: translateY(10px);
			opacity: 1;
		}
	}
</style>
