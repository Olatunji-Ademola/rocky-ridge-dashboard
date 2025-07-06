<script>
	import { EyeRegular, EyeSlashRegular } from 'svelte-awesome-icons';

	let inputPassword = $state(null);
	let isPasswordVisible = $state(false);

	$effect(() => {
		inputPassword = document.getElementById('password');
	});

	function togglePasswordVisibility() {
		const inputType = inputPassword.getAttribute('type');

		if (inputType === 'password') {
			// make visible
			isPasswordVisible = true;
			inputPassword.setAttribute('type', 'text');
		} else {
			isPasswordVisible = false;
			inputPassword.setAttribute('type', 'password');
		}
	}
</script>

<div class="relative">
	<input
		type="password"
		id="password"
		name="password"
		placeholder="Password"
		required
		class=" w-full rounded-md border border-gray-300 p-2 outline-none focus:shadow *:focus:shadow focus:placeholder:text-gray-200"
	/>
	<button
		aria-label="toggle password visibility"
		type="button"
		onclick={togglePasswordVisibility}
		class="absolute top-1/2 right-2 block -translate-y-1/2 cursor-pointer p-1"
	>
		{#if isPasswordVisible}
			<EyeRegular size="17" />
		{:else}
			<EyeSlashRegular size="18" />
		{/if}
	</button>
</div>
