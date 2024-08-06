<script lang="ts">
	import { Heading } from 'flowbite-svelte';

	export let text = '';
	export let level = 1;

	const tags: Record<number, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
		1: 'h1',
		2: 'h2',
		3: 'h3',
		4: 'h4',
		5: 'h5',
		6: 'h6'
	};

	const tag = tags[level] ?? 'h1';
</script>

<Heading {tag} class="mb-4">{text}</Heading>
