<script>
	import {
		AwardSolid,
		BarsSolid,
		CalendarCheckRegular,
		CalendarRegular,
		ClockRegular,
		HouseSolid,
		MapRegular,
		ScrewdriverWrenchSolid,
		XmarkSolid,
		XSolid
	} from 'svelte-awesome-icons';

	import { page } from '$app/stores';
	import DashboardLink from '$lib/component/ui/DashboardLink.svelte';
	import UserInfoPopup from '$lib/component/ui/UserInfoPopup.svelte';
	const { data, children } = $props();

	let menuOpen = $state(false);

	let menuRef = null;
	let menuFillerRef = null;

	$effect(() => {
		if (menuOpen) {
			menuRef.classList.remove('hidden');
			menuFillerRef.classList.remove('hidden');
		} else {
			menuRef.classList.add('hidden');
			menuFillerRef.classList.add('hidden');
		}
	});

	const openMenu = () => {
		menuOpen = true;
	};
	const closeMenu = () => {
		menuOpen = false;
	};
</script>

<div class="relative flex h-svh flex-col lg:flex-row">
	<aside
		bind:this={menuRef}
		class="absolute top-12 right-5 z-50 hidden min-w-69 overflow-hidden rounded-2xl border-r border-gray-500 border-r-gray-200 bg-white p-4 text-sm shadow-lg lg:static lg:block lg:h-full lg:rounded-none"
	>
		<div class=" hidden border-b border-b-gray-200 lg:block">
			<h2 class="text-2xl font-bold">
				{data['Name']}
			</h2>
			<p class="text-sm text-gray-500">Welcome</p>
		</div>
		<div class="lg:mt-20">
			<h3 class="text-gray-400">Dash menu</h3>
			<ul class=" mr-4 text-gray-600 capitalize *:mt-6">
				<DashboardLink to="/dashboard" color="#bbb6ae" pathname={$page.url.pathname}>
					<HouseSolid size="16" class="text-[#bbb6ae]" />
					<p>home</p>
				</DashboardLink>
				<DashboardLink to="/dashboard/schedule" color="#007775" pathname={$page.url.pathname}>
					<CalendarRegular size={16} class="text-primary_green opacity-70" />
					<p>schedule</p>
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
	<button
		bind:this={menuFillerRef}
		onclick={closeMenu}
		type="button"
		aria-label="closeMenu"
		id="menuFiller"
		class="absolute inset-0 z-40 hidden bg-black/10 lg:hidden"
	></button>

	<div class="flex justify-between p-4 text-gray-500 shadow lg:hidden">
		<h2>
			Welcome <span class="font-bold">{data['Name']}</span>
		</h2>
		<button type="button" onclick={openMenu}>
			{#if menuOpen}
				<XmarkSolid />
			{:else}
				<BarsSolid />
			{/if}
		</button>
	</div>

	<main class="bg-primary_yellow/5 grow overflow-auto">
		{@render children()}
	</main>
</div>

<style>
	* {
		font-family: 'Poppins', sans-serif;
	}
</style>
