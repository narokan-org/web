<script lang="ts">
	import { Input, Label, Helper, P } from 'flowbite-svelte';

	export let label: string;
	export let name: string;

	export let value: string = '';
	export let required: boolean = false;
	export let errorText: string = '';
	export let additionalText: string = '';
	export let maxLength: number | undefined = undefined;
</script>

<div {...$$restProps}>
	<Label class={`${errorText ? 'text-red-500' : ''}`}>
		<span class={`${errorText ? 'text-red-500' : ''}`}>{label}</span>
		{#if required}<span class="text-red-500">*</span>{/if}

		<Input type="text" {name} {required} bind:value {maxLength} />

		{#if additionalText}
			<P class={`${errorText ? 'text-red-500' : ''}`}>{additionalText}</P>
		{/if}

		{#if errorText}
			<Helper class="mt-2" color="red">{errorText}</Helper>
		{/if}
	</Label>
</div>
