<script lang="ts">
	import { Spinner, P } from 'flowbite-svelte';

	export let size: number = 8;
	export let message: string = '';
</script>

<div class="flex flex-col justify-center items-center h-screen">
	<div class="flex flex-col items-center">
		<Spinner {size} />
		{#if message}
			<P class="mt-2">{message}</P>
		{/if}
	</div>
</div>
