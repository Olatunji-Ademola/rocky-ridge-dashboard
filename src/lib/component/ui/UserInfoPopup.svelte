<script>
	import { UserSolid } from 'svelte-awesome-icons';

	const { userData } = $props();
	const infos = [
		'Email',
		'Instrument Faculty',
		'Practice Room Assignment',
		'Cabin Assignment',
		'Cabin Code',
		'Ensemble Coaches',
		'Ensemble info'
	];
</script>

<div class="group">
	<div class="flex items-center gap-2">
		<div>
			{userData['Email']}
		</div>
		<div class="text-primary_green w-fit cursor-pointer rounded-lg bg-white p-2 shadow">
			<UserSolid size="20" />
		</div>
	</div>

	<div
		id="infoPopup"
		class="  absolute top-0 right-0 z-50 m-3 hidden w-fit pt-8 pr-8 group-hover:block"
	>
		<div class="border-primary_green/40 rounded-xl border bg-white p-4 shadow-lg">
			<ul class="flex flex-col text-sm text-gray-500">
				{#each infos as info}
					<li class="mt-2 text-nowrap">
						{info}:
						<span class="text-primary_green">
							{userData[info]}
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	#infoPopup {
		animation: slideIn 0.6s ease-in-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(10%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
