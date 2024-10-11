<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	export let heading: string;
</script>

<div class="flex flex-col mt-2">
	<Heading class="text-2xl font-bold" tag="h4">{heading}</Heading>
	<slot name="content"></slot>
</div>
