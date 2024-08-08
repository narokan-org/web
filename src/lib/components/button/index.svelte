<script lang="ts">
	import { Button } from 'flowbite-svelte';
	export let text: string;
	export let color: 'light' = 'light';
</script>

<Button {color}>{text}</Button>
