<script>
	const { text, color = '#007775' } = $props();

	let someText = $state('');
	const maxText = 105;
	const showSeeMore = text.length > maxText;
	if (showSeeMore) {
		for (let i = 0; i < maxText; i++) {
			someText += text[i];
		}
	}

	let showMoreText = $state(false);

	const seeMoreHandler = () => {
		showMoreText = true;
	};
	const seeLessHandler = () => {
		showMoreText = false;
	};
	const setstyleVariable = (node, value) => {
		node.style.setProperty(`--color`, value);
	};
</script>

<div class="">
	{#if showSeeMore}
		{#if showMoreText}
			<span>
				{text}
			</span>
			<button
				use:setstyleVariable={color}
				type="button"
				onclick={seeLessHandler}
				class=" cursor-pointer rounded-3xl px-1">...see less</button
			>
		{:else}
			<span>{someText} </span>
			<button
				use:setstyleVariable={color}
				type="button"
				onclick={seeMoreHandler}
				class=" cursor-pointer rounded-3xl px-1">...see more</button
			>
		{/if}
	{:else}
		<span>
			{text}
		</span>
	{/if}
</div>

<style>
	button {
		color: var(--color);
		background-color: color-mix(in oklab, var(--color) 5%, transparent);
	}
</style>
