<script>
	import { enhance } from '$app/forms';
	import Input from '$lib/component/ui/Input.svelte';
	import SeeMoreText from '$lib/component/ui/SeeMoreText.svelte';
	import { onMount } from 'svelte';
	import { getRequestHistory, setPopupMessage, setRequestHistory } from '../store.svelte.js';
	import { SpinnerSolid } from 'svelte-awesome-icons';

	const { data, form } = $props();

	let isSubmitting = $state(false);
	let gettingHistory = $state(false);

	$effect(async () => {
		if (!getRequestHistory()) {
			gettingHistory = true;
			try {
				const res = await fetch('/dashboard/maintenance-request', {
					method: 'POST',
					body: JSON.stringify({ email: data['Email'] }),
					headers: { 'Content-Type': 'application/json' }
				});

				const resData = await res.json();
				setRequestHistory(resData.requestHistory);
			} catch (err) {
			} finally {
				gettingHistory = false;
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
				<p>
					If you notice anything in your room, hall, or common areas that seems broken, damaged, or
					out of place, please don't hesitate to submit a maintenance request.
				</p>

				<p>
					Your feedback helps us keep our facilities safe, clean, and comfortable for everyone.
					Every request is reviewed and addressed as promptly as possible — and your effort in
					reporting issues is genuinely appreciated.
				</p>

				<p>Thank you for helping us maintain a great living environment!</p>
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
								setRequestHistory([...getRequestHistory(), form?.request]);
							} else if (form?.errorMessage) setPopupMessage(form.errorMessage, 'error');
						};
					}}
				>
					<Input name="location" placeholder="request location" color="#ff5266" />
					<Input name="message" placeholder="message" isInput={false} color="#ff5266" />

					<div class="flex justify-end">
						<button
							disabled={isSubmitting}
							class="bg-primary_red w-48 cursor-pointer rounded-sm p-2 text-white disabled:bg-gray-400"
						>
							{#if isSubmitting}
								<div class="flex justify-center gap-2">
									<span> Submitting Request </span>
									<SpinnerSolid size={20} class="spinner animate-loading" />
								</div>
							{:else}
								Submit Request
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
		<div
			class="h-fit max-w-4xl basis-full bg-white p-4 text-sm sm:rounded-md sm:shadow-md lg:max-w-full"
		>
			<h2 class="mb-4 text-xl font-bold text-gray-600">Request History</h2>
			{#if !gettingHistory}
				{#if getRequestHistory()}
					{#each getRequestHistory() as request}
						<div class="border-primary_red/20 mb-4 border-l-2 px-2">
							<h3 class="font-bold text-gray-500">{request['Location']}</h3>
							<p class="text-gray-400">
								<SeeMoreText text={request['Message']} color="#ff5266" />
							</p>
						</div>
					{/each}
				{:else}
					<p class="text-center text-sm text-gray-400">
						You haven't submitted a maintenance request yet.
					</p>
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
