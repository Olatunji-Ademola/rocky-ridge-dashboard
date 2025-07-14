<script>
	import {
		AwardSolid,
		CalendarCheckRegular,
		CalendarRegular,
		ClockRegular,
		HouseSolid,
		MapRegular,
		ScrewdriverWrenchSolid
	} from 'svelte-awesome-icons';

	import { page } from '$app/stores';
	import DashboardLink from '$lib/component/ui/DashboardLink.svelte';
	import UserInfoPopup from '$lib/component/ui/UserInfoPopup.svelte';
	const { data, children } = $props();
</script>

<div class="relative flex h-svh flex-row">
	<aside
		class=" z-1 h-full overflow-hidden border-r border-gray-500 border-r-gray-200 p-4 text-sm shadow-lg"
	>
		<div class=" border-b border-b-gray-200">
			<h2 class="text-2xl font-bold">
				{data['Name']}
			</h2>
			<p class="text-sm text-gray-500">Welcome</p>
		</div>
		<div class="mt-20">
			<h3 class="text-gray-400">Dash menu</h3>
			<ul class=" mr-4 text-gray-600 capitalize *:mt-6">
				<DashboardLink to="/dashboard" color="#bbb6ae" pathname={$page.url.pathname}>
					<HouseSolid size="16" class="text-[#bbb6ae]" />
					<p>home</p>
				</DashboardLink>
				<DashboardLink to="/dashboard/calendar" color="#007775" pathname={$page.url.pathname}>
					<CalendarRegular size={16} class="text-primary_green opacity-70" />
					<p>calendar</p>
				</DashboardLink>
				<DashboardLink to="/dashboard/map" color="#ff5266" pathname={$page.url.pathname}>
					<MapRegular size={16} class="text-primary_red opacity-70" />
					<p>campus map</p>
				</DashboardLink>
				<DashboardLink to="" color="#f89e1e" pathname={$page.url.pathname}>
					<ClockRegular size={16} class="text-primary_yellow opacity-70" />
					<p>time sheet</p>
				</DashboardLink>
				<DashboardLink to="" color="#007775" pathname={$page.url.pathname}>
					<CalendarCheckRegular size={16} class="text-primary_green opacity-70" />
					<p>schedule a lesson</p>
				</DashboardLink>
				<DashboardLink to="" color="#ff5266" pathname={$page.url.pathname}>
					<ScrewdriverWrenchSolid size={16} class="text-primary_red opacity-70" />
					<p>mentainace request</p>
				</DashboardLink>
				<DashboardLink to="" color="#f89e1e" pathname={$page.url.pathname}>
					<AwardSolid size={16} class="text-primary_yellow opacity-70" />
					<p>paper plate nomination</p>
				</DashboardLink>
			</ul>
		</div>
	</aside>
	<main class="bg-primary_yellow/5 flex-auto overflow-auto">
		{@render children()}
	</main>
</div>

<style>
	* {
		font-family: 'Poppins', sans-serif;
	}
</style>
