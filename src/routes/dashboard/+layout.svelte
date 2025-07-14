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
		<!-- <div class=" z-10 flex justify-between p-3">
			<h3 class="text-lg">Welcome {data['Name']}</h3>

			<UserInfoPopup userData={data} />
		</div> -->

		<div class=" border-b border-b-gray-200">
			<h2 class="text-2xl font-bold">
				{data['Name']}
			</h2>
			<p class="text-sm text-gray-500">Welcome</p>
		</div>
		<div class="mt-20">
			<h3 class="text-gray-400">Dash menu</h3>
			<ul class=" mr-4 text-gray-600 capitalize *:mt-6">
				<DashboardLink to="/dashboard" pathname={$page.url.pathname}>
					<HouseSolid size="16" class="text-[#bbb6ae]" />
					<p>home</p>
				</DashboardLink>
				<DashboardLink to="/dashboard/calendar" pathname={$page.url.pathname}>
					<CalendarRegular size={16} class="text-primary_green opacity-70" />
					<p>calendar</p>
				</DashboardLink>
				<DashboardLink to="/dashboard/map" pathname={$page.url.pathname}>
					<MapRegular size={16} class="text-primary_red opacity-70" />
					<p>campus map</p>
				</DashboardLink>
				<DashboardLink to="" pathname={$page.url.pathname}>
					<ClockRegular size={16} class="text-primary_yellow opacity-70" />
					<p>time sheet</p>
				</DashboardLink>
				<DashboardLink to="" pathname={$page.url.pathname}>
					<CalendarCheckRegular size={16} class="text-primary_green opacity-70" />
					<p>schedule a lesson</p>
				</DashboardLink>
				<DashboardLink to="" pathname={$page.url.pathname}>
					<ScrewdriverWrenchSolid size={16} class="text-primary_red opacity-70" />
					<p>mentainace request</p>
				</DashboardLink>
				<DashboardLink to="" pathname={$page.url.pathname}>
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
	/* aside::before {
		z-index: -1;
		content: '';
		position: absolute;
		top: -25px;
		left: 200px;
		width: 250px;
		height: 250px;
		background: var(--color-primary_red);
		border-radius: 100%;
	} */
</style>
