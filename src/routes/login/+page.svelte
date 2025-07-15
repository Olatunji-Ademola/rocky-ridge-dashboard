<script>
	import logoImage from '$lib/image/logo.svg';
	import { SpinnerSolid, TriangleExclamationSolid } from 'svelte-awesome-icons';
	import PasswordWithVisibiltyToggle from './PasswordWithVisibiltyToggle.svelte';
	import RoleSeletion from './RoleSeletion.svelte';
	import { enhance } from '$app/forms';

	const { form } = $props();
	let errorMsg = $state(null);
	let isSubmittingForm = $state(false);
</script>

<main class="flex h-svh justify-center sm:items-center sm:bg-gray-100">
	<div class="relative w-96 max-w-full">
		{#if errorMsg}
			<div
				class="text-primary_red absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-red-200 px-6 py-2 text-center leading-tight"
			>
				<TriangleExclamationSolid class="animate-wiggle" />
				<h2>{errorMsg}</h2>
			</div>
		{/if}
		<div
			class="login-box flex w-full max-w-md flex-col gap-11 bg-white p-6 sm:items-center sm:gap-6 sm:shadow"
		>
			<img src={logoImage} alt="rock rigde logo" width="200px" class="" />
			<form
				method="POST"
				action="?/login"
				use:enhance={() => {
					isSubmittingForm = true;
					errorMsg = null;
					return async ({ update }) => {
						await update();
						errorMsg = form?.message;
						isSubmittingForm = false;
					};
				}}
				class=" w-full text-gray-500 *:mb-3 *:text-base"
			>
				<div>
					<input
						type="email"
						autocomplete="email"
						name="email"
						placeholder="Email address"
						value={form?.email || ''}
						required
						class=" w-full rounded-md border border-gray-300 p-2 outline-none focus:shadow-sm focus:placeholder:text-gray-200"
					/>
				</div>
				<PasswordWithVisibiltyToggle />
				<RoleSeletion />
				<div class="!mb-0 flex justify-end">
					<button
						disabled={isSubmittingForm}
						class="bg-primary_red w-full max-w-40 cursor-pointer rounded-sm !border-none p-2 !text-base font-bold text-white opacity-90 transition-colors duration-400 hover:opacity-100 disabled:bg-gray-400 sm:max-w-full"
					>
						{#if isSubmittingForm}
							<SpinnerSolid class="spinner animate-loading mx-auto" />
						{:else}
							Log In
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</main>

<style>
	* {
		font-family: 'Poppins', sans-serif;
	}

	@keyframes slideUp {
		from {
			transform: translateY(20px);
		}
		to {
			transform: translateY(0);
		}
	}

	.login-box {
		animation: slideUp 1.2s ease-out forwards;
	}
</style>
