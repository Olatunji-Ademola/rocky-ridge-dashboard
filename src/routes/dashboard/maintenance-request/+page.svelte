<script>
	import Input from '$lib/component/ui/Input.svelte';

	const { data, form } = $props();
	console.log('success', form?.success);
</script>

<section class="sm:p-4">
	<div class="flex gap-4">
		<div>
			<article
				class="mb-5 w-lg rounded border border-gray-300 bg-white p-4 text-sm text-gray-500 *:mb-2"
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

			<div class="w-lg rounded border border-gray-300 bg-white p-4">
				<form action="?/request" method="post" class="flex flex-col text-sm *:mb-2">
					<Input placeholder="request location" color="#ff5266" />
					<Input placeholder="message" isInput={false} color="#ff5266" />

					<button class="bg-primary_red cursor-pointer rounded-sm p-2 text-white">
						Submit Request</button
					>
				</form>
			</div>
		</div>
		<div class="h-fit basis-full rounded border border-gray-300 bg-white p-4">
			<h2 class="mb-4 text-xl font-bold text-gray-600">Request History</h2>
			{#if false}
				your maintenance request history
			{:else}
				<p class="text-center text-sm text-gray-400">
					You haven't submitted a maintenance request yet.
				</p>
			{/if}
		</div>
	</div>
</section>
