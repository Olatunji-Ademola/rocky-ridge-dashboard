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
	import { json } from '@sveltejs/kit';
	import { getPopupMessage, setIsUserActive, setUserSchedule } from './store.svelte.js';
	import Notification from '$lib/component/ui/Notification.svelte';
	const { data, children, url } = $props();

	let menuOpen = $state(false);
	let dataLoaded = $state(false);

	let menuRef = null;
	let menuFillerRef = null;

	$effect(async () => {
		let UserSessions = data['Session'].split(',').map((value) => value.trim());
		try {
			const res = await fetch('/dashboard/api/presentSession');
			const sessionData = await res.json();
			const { presentSession, allSessionList } = sessionData;

			// list of session the user is active for

			// check if the user have access to the present session
			const isUserActive = UserSessions.includes(presentSession);

			// set user session schedule
			let userSchedule = '';
			if (isUserActive) {
				userSchedule = presentSession;
			} else {
				if (allSessionList.includes(presentSession)) {
					let avaliableSessions = [];

					// get all the sessiom prior to the present session
					for (let i = 0; i < allSessionList.length; i++) {
						if (allSessionList[i] == presentSession) break;
						avaliableSessions.push(allSessionList[i]);
					}

					// get the latest session in the list of avaliableSessions is uesr is active
					UserSessions.forEach((value) => {
						if (avaliableSessions.includes(value)) userSchedule = value;
					});

					// if no session is avaliable to the user pick the user frist active session
					if (!userSchedule) userSchedule = UserSessions[0];
				} else {
					userSchedule = UserSessions[0];
				}
			}

			// set global state
			setIsUserActive(isUserActive);
			setUserSchedule(userSchedule);
			dataLoaded = true;
		} catch (err) {
			dataLoaded = true;
			setUserSchedule(UserSessions[0]);
		}
	});

	$effect(async () => {
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
		<div class=" lg:mt-20">
			<h3 class="text-gray-400">Dash menu</h3>
			<ul class=" mr-4 text-gray-600 capitalize *:mt-6">
				<DashboardLink to="/dashboard" color="#ff5266" pathname={$page.url.pathname}>
					<HouseSolid size="16" class="text-primary_red opacity-70" />
					<p>home</p>
				</DashboardLink>
				<DashboardLink to="/dashboard/schedule" color="#007775" pathname={$page.url.pathname}>
					<CalendarRegular size={16} class="text-primary_green opacity-70" />
					<p>schedule</p>
				</DashboardLink>
				<DashboardLink to="/dashboard/map" color="#f89e1e" pathname={$page.url.pathname}>
					<MapRegular size={16} class="text-primary_yellow opacity-70" />
					<p>campus map</p>
				</DashboardLink>
				<DashboardLink to="" color="#007775" pathname={$page.url.pathname}>
					<ClockRegular size={16} class="text-primary_green opacity-70" />
					<p>time sheet</p>
				</DashboardLink>
				<DashboardLink
					to="/dashboard/maintenance-request"
					color="#ff5266"
					pathname={$page.url.pathname}
				>
					<ScrewdriverWrenchSolid size={16} class="text-primary_red opacity-70" />
					<p>maintenance request</p>
				</DashboardLink>
				<DashboardLink
					to="/dashboard/paper-plate-nomination"
					color="#f89e1e"
					pathname={$page.url.pathname}
				>
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

	<div class="flex justify-between border-b border-gray-300 p-4 text-gray-500 lg:hidden">
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

	<main class="relative grow overflow-auto bg-gray-50">
		{#if getPopupMessage()}
			<Notification {...getPopupMessage()} />
		{/if}

		<!-- map | home -->
		{#if $page.url.pathname == '/dashboard' || $page.url.pathname == '/dashboard/map' || dataLoaded}
			{@render children()}
		{/if}
	</main>
</div>

<style>
	* {
		font-family: 'Poppins', sans-serif;
	}
</style>
