<script lang="ts">
	import { P } from 'flowbite-svelte';
	export let heading: string;
	export let subheading: string;
	export let key: string;
</script>

<div class="flex flex-row max-w-[400px]" {...$$restProps}>
	<div class="flex flex-col mt-1 mr-2">
		<slot name="icon" />
	</div>
	<div class="flex flex-col">
		<P data-testId={`feature-heading-${key}`} class="text-xl">{heading}</P>
		<P data-testId={`feature-subheading-${key}`} class="mt-2">{subheading}</P>
	</div>
</div>
