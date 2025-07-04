<script>
	import logoImage from '$lib/image/logo.svg';
	import PasswordWithVisibiltyToggle from './PasswordWithVisibiltyToggle.svelte';
	import RoleSeletion from './RoleSeletion.svelte';
</script>

<main class="flex h-svh justify-center sm:items-center sm:bg-gray-100">
	<div
		class="login-box flex w-full max-w-md flex-col gap-11 bg-white p-6 sm:max-w-96 sm:items-center sm:gap-6 sm:shadow"
	>
		<img src={logoImage} alt="rock rigde logo" width="200px" class=" opacity-30 grayscale" />
		<form method="POST" action="?/login" class=" w-full text-gray-500 *:mb-3 *:text-base">
			<div>
				<input
					type="email"
					autocomplete="email"
					name="email"
					placeholder="Email address"
					required
					class=" w-full rounded-md border border-gray-300 p-2 outline-none focus:shadow *:focus:shadow focus:placeholder:text-gray-300"
				/>
			</div>
			<PasswordWithVisibiltyToggle />
			<RoleSeletion />
			<div class="!mb-0 flex justify-end">
				<button
					class="bg-primary_red w-full max-w-40 cursor-pointer rounded-sm !border-none p-2 !text-base font-bold text-white opacity-90 transition-colors duration-400 hover:opacity-100 sm:max-w-full"
					>Log In</button
				>
			</div>
		</form>
	</div>
</main>

<style>
	* {
		font-family: 'Poppins', sans-serif;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.login-box {
		animation: slideUp 1.2s ease-out forwards;
	}
</style>
