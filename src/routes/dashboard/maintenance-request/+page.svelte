<script>
	import { enhance } from '$app/forms';
	import Input from '$lib/component/ui/Input.svelte';
	import SeeMoreText from '$lib/component/ui/SeeMoreText.svelte';
	import { onMount } from 'svelte';
	import { getRequestHistory, setRequestHistory } from '../store.svelte.js';

	const { data, form } = $props();

	let isSubmitting = $state(false);
	let gettingHistory = $state(false);

	// TODO :
	// store the requst history in a global store and make it run once
	// add style

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

	// if (form?.successMessage) notification(form.successMessage);
	// if (form?.errorMessage) notification(form.errorMessage, "error");
</script>

<section class="sm:p-4">
	<div class="flex gap-4">
		<div>
			<article
				class="mb-5 w-lg rounded border border-gray-300 bg-white p-4 text-sm text-gray-500 shadow *:mb-2"
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

			<div class="w-lg rounded border border-gray-300 bg-white p-4 shadow">
				<form
					action="?/request"
					method="post"
					class="flex flex-col text-sm *:mb-2"
					use:enhance={({ formData }) => {
						formData.append('Name', data['Name']);
						formData.append('Email', data['Email']);

						isSubmitting = true;

						return async ({ update }) => {
							await update();
							isSubmitting = false;
							// console.log('form', form?.request);
							if (form?.successMessage) setRequestHistory([...getRequestHistory(), form?.request]);
						};
					}}
				>
					<Input name="location" placeholder="request location" color="#ff5266" />
					<Input name="message" placeholder="message" isInput={false} color="#ff5266" />

					<button
						disabled={isSubmitting}
						class="bg-primary_red cursor-pointer rounded-sm p-2 text-white disabled:bg-gray-400"
					>
						{#if isSubmitting}
							Submitting Request
						{:else}
							Submit Request
						{/if}
					</button>
				</form>
			</div>
		</div>
		<div class="h-fit basis-full rounded border border-gray-300 bg-white p-4 text-sm shadow">
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
				<p>loading history</p>
			{/if}
		</div>
	</div>
</section>
