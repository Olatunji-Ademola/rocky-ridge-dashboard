<script>
	import { enhance } from '$app/forms';
	import Input from '$lib/component/ui/Input.svelte';
	import { onMount } from 'svelte';
	import { getNominees, setNominees, setPopupMessage } from '../store.svelte.js';
	import { SpinnerSolid } from 'svelte-awesome-icons';

	const { data, form } = $props();

	let isSubmitting = $state(false);
	let gettingNominees = $state(false);

	$effect(async () => {
		if (!getNominees()) {
			gettingNominees = true;
			try {
				const res = await fetch('/dashboard/paper-plate-nomination', {
					method: 'POST',
					body: JSON.stringify({ email: data['Email'] }),
					headers: { 'Content-Type': 'application/json' }
				});

				const resData = await res.json();
				setNominees(resData.nominees);
			} catch (err) {
			} finally {
				gettingNominees = false;
			}
		}
	});
</script>

<section class="   sm:bg-transparent sm:p-4">
	<div class="flex flex-col gap-4 xl:flex-row">
		<div class=" w-full shrink-0 sm:mb-6 sm:w-lg xl:mb-0">
			<article
				class="mb-4 bg-white p-4 text-sm text-gray-500 *:mb-2 sm:mb-5 sm:rounded-md sm:shadow-md"
			>
				<p>Hey everyone!</p>

				<p>
					It's time to bring out the creativity, the laughs, and a little friendly fun with the
					Paper Plate Nominations!
				</p>

				<p>
					This is your chance to recognize your peers in the most hilarious, heartfelt, or downright
					ridiculous ways; from “Most Likely to Brighten Your Day” to “Snack Ninja of the Year.” The
					only limit is your imagination
				</p>

				<p>So think of someone who deserves a fun shout-out, and nominate away!</p>
				<p>
					Let's celebrate each other, laugh a little louder, and make some unforgettable memories.
				</p>

				<p>Get nominating and don't forget to have fun with it!</p>
			</article>

			<div class=" bg-white p-4 sm:rounded-md sm:shadow-md">
				<form
					action="?/request"
					method="post"
					class="flex max-w-lg flex-col text-sm *:mb-2 sm:w-full"
					use:enhance={({ formData }) => {
						formData.append('Name', data['Name']);
						formData.append('Email', data['Email']);

						isSubmitting = true;

						return async ({ update }) => {
							await update();
							isSubmitting = false;
							if (form?.successMessage) {
								setPopupMessage(form.successMessage, 'success');
								setNominees([...getNominees(), form?.request]);
							} else if (form?.errorMessage) setPopupMessage(form.errorMessage, 'error');
						};
					}}
				>
					<Input name="nominee" placeholder="Nominee" color="#f89e1e" />
					<Input name="award" placeholder="For What Award" color="#f89e1e" />

					<div class="flex justify-end">
						<button
							disabled={isSubmitting}
							class="bg-primary_yellow w-48 cursor-pointer rounded-sm p-2 text-white disabled:bg-gray-400"
						>
							{#if isSubmitting}
								<div class="flex justify-center gap-2">
									<span> Submitting Nominee </span>
									<SpinnerSolid size={20} class="spinner animate-loading" />
								</div>
							{:else}
								Submit Nominee
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
		<div
			class="h-fit max-w-4xl basis-full bg-white p-4 text-sm sm:rounded-md sm:shadow-md lg:max-w-full"
		>
			<h2 class="mb-4 text-xl font-bold text-gray-600">Your Nominees</h2>
			{#if !gettingNominees}
				{#if getNominees()}
					{#each getNominees() as nominee}
						<div class="border-primary_yellow/40 mb-4 border-l-2 px-2">
							<h3 class="font-bold text-gray-500">{nominee['Nominee']}</h3>
							<p class="text-gray-400">
								nominated for: {nominee['Award']}
							</p>
						</div>
					{/each}
				{:else}
					<p class="text-center text-sm text-gray-400">You haven't nominated anyone yet</p>
				{/if}
			{:else}
				<div class=" flex gap-2 text-gray-400">
					<span>Loading history</span>

					<span>
						<SpinnerSolid size={20} class="spinner animate-loading" />
					</span>
				</div>
			{/if}
		</div>
	</div>
</section>
