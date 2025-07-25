<script>
	import { EyeRegular, EyeSlashRegular, SpinnerSolid } from 'svelte-awesome-icons';
	import { getAnnouncementData, setAnnouncementData } from './store.svelte';
	import SeeMoreText from '$lib/component/ui/SeeMoreText.svelte';

	const { data } = $props();
	const userInfo = [
		'Email',
		'Position',
		'Cabin Code',
		'Instrument',
		'Instrument Faculty',
		'Practice Room Assignment',
		'Cabin Assignment',
		'Ensemble Coaches',
		'Ensemble info'
	];

	let showPassword = $state(false);
	let loadingAnnounement = $state(false);

	const togglePassword = () => {
		showPassword = !showPassword;
	};
	// load the announcement once
	$effect(async () => {
		if (!getAnnouncementData()) {
			try {
				loadingAnnounement = true;
				const res = await fetch('/dashboard');
				const d = await res.json();
				setAnnouncementData(d);
			} catch (err) {
			} finally {
				loadingAnnounement = false;
			}
		}
	});
</script>

<section class=" sm:p-4">
	<div
		class="mx-auto min-w-xs rounded-md bg-white p-4 text-sm text-gray-600 *:my-2 sm:mx-0 sm:w-fit sm:px-6 sm:shadow-md"
	>
		{#each userInfo as info}
			{#if info == 'Cabin Code'}
				<div class="text-primary_green flex *:mr-2">
					<span>
						{info} :
					</span>
					<span class="text-gray-500">
						{#if showPassword}
							{data[info]}
						{:else}
							<p class="tracking-[0.11rem]">******</p>
						{/if}
					</span>
					<button type="button" onclick={togglePassword} class="text-primary_green">
						{#if showPassword}
							<EyeRegular size="18" />
						{:else}
							<EyeSlashRegular size="18" />
						{/if}
					</button>
				</div>
			{:else if data[info]}
				<div class="*:mr-2">
					<span class="text-primary_green">
						{info} :
					</span>
					<span class="text-gray-500">
						{data[info]}
					</span>
				</div>
			{/if}
		{/each}
	</div>
	<div class=" my-10 max-w-4xl rounded-md bg-white p-4 text-sm text-gray-500 sm:shadow-md">
		<h2 class="mb-4 text-xl font-bold text-gray-600">Announcements</h2>
		<div class="flex flex-col-reverse gap-6">
			{#if loadingAnnounement}
				<div class="inline-flex gap-2">
					<p>Loading announcements</p>
					<SpinnerSolid size={20} class="spinner animate-loading" />
				</div>
			{:else if getAnnouncementData()?.length}
				{#each getAnnouncementData() as AnnouncementData}
					<div
						class=" border-l-primary_green/40 nth-last-[1]:border-l-primary_red/50 border-l-2 px-2"
					>
						<div class="text-primary_green mb-1">
							{AnnouncementData[0]}
						</div>
						<div class="">
							<!-- {AnnouncementData[1]} -->
							<SeeMoreText text={AnnouncementData[1]} />
						</div>
					</div>
				{/each}
			{:else}
				<p>No Announcements Yet</p>
			{/if}
		</div>
	</div>
</section>
