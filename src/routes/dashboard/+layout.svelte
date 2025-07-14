<script>
	import {
		AwardSolid,
		CalendarCheckRegular,
		CalendarRegular,
		ClockRegular,
		MapRegular,
		ScrewdriverWrenchSolid
	} from 'svelte-awesome-icons';

	import { page } from '$app/stores';
	import DashboardLink from '$lib/component/ui/DashboardLink.svelte';
	import UserInfoPopup from '$lib/component/ui/UserInfoPopup.svelte';
	const { data, children } = $props();
</script>

<div class="relative flex h-svh flex-col">
	<aside
		class="relative z-1 inline-table overflow-hidden bg-linear-30 from-[#367183] from-60% to-[#396767] to-60% text-sm text-white"
	>
		<div class=" z-10 flex justify-between p-3">
			<h3 class="text-lg">Welcome {data['Name']}</h3>

			<UserInfoPopup userData={data} />
		</div>
		<ul class="*:hover:text-primary_red inline-flex text-sm capitalize *:rounded-sm">
			<DashboardLink to="/dashboard/calendar" pathname={$page.url.pathname}>
				<CalendarRegular size={16} class="opacity-70" />
				<p>calendar</p>
			</DashboardLink>
			<DashboardLink to="/dashboard/map" pathname={$page.url.pathname}>
				<MapRegular size={16} class="opacity-70" />
				<p>campus map</p>
			</DashboardLink>
			<DashboardLink to="" pathname={$page.url.pathname}>
				<ClockRegular size={16} class="opacity-70" />
				<p>time sheet</p>
			</DashboardLink>
			<DashboardLink to="" pathname={$page.url.pathname}>
				<CalendarCheckRegular size={16} class="opacity-70" />
				<p>schedule a lesson</p>
			</DashboardLink>
			<DashboardLink to="" pathname={$page.url.pathname}>
				<ScrewdriverWrenchSolid size={16} class="opacity-70" />
				<p>mentainace request</p>
			</DashboardLink>
			<DashboardLink to="" pathname={$page.url.pathname}>
				<AwardSolid size={16} class="opacity-70" />
				<p>paper plate nomination</p>
			</DashboardLink>
		</ul>
	</aside>
	<main class="flex-auto bg-white">
		{@render children()}
	</main>
</div>

<style>
	* {
		font-family: 'Poppins', sans-serif;
	}
	aside::before {
		z-index: -1;
		content: '';
		position: absolute;
		top: -25px;
		left: 200px;
		width: 250px;
		height: 250px;
		background: var(--color-primary_red);
		border-radius: 100%;
	}
</style>
