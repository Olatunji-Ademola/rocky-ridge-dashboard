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
	let { data, children, url } = $props();

	console.log($page.url.pathname);

	console.log('data', data);
</script>

<div class="flex h-svh">
	<div class="absolute right-0">
		<div>me</div>
		<div>
			<ul>
				{#each data as d}
					<li>{d}</li>
				{/each}
			</ul>
		</div>
	</div>

	<aside class=" p-4 shadow-xl">
		<div class="">
			<h3 class="text-primary_green text-lg font-bold">Welcome {data['Name']}</h3>
			<p class="text-sm text-gray-600">{data['Email']}</p>
		</div>
		<ul
			class="*:hover:text-primary_red mt-30 text-sm text-gray-700 capitalize *:mt-6 *:rounded-sm *:p-1 *:px-4 *:py-1"
		>
			<DashboardLink to="/dashboard/calendar" pathname={$page.url.pathname}>
				<CalendarRegular size={20} />
				<p>calendar</p>
			</DashboardLink>
			<DashboardLink to="/dashboard/map" pathname={$page.url.pathname}>
				<MapRegular size={20} />
				<p>campus map</p>
			</DashboardLink>
			<DashboardLink to="" pathname={$page.url.pathname}>
				<ClockRegular size={20} />
				<p>time sheet</p>
			</DashboardLink>
			<DashboardLink to="" pathname={$page.url.pathname}>
				<CalendarCheckRegular size={20} />
				<p>schedule a lesson</p>
			</DashboardLink>
			<DashboardLink to="" pathname={$page.url.pathname}>
				<ScrewdriverWrenchSolid size={20} />
				<p>mentainace request</p>
			</DashboardLink>
			<DashboardLink to="" pathname={$page.url.pathname}>
				<AwardSolid size={20} />
				<p>paper plate nomination</p>
			</DashboardLink>
		</ul>
	</aside>
	<main class="bg-primary_green/5 flex-auto">
		<!--  -->
		{@render children()}
	</main>
</div>

<style>
	* {
		font-family: 'Poppins', sans-serif;
	}
</style>
