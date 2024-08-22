<script lang="ts">
	import { Card, P, Progressbar } from 'flowbite-svelte';
	import { t } from '$lib/translations';
	export let heading: string;
	export let inProgressItems: number;
	export let totalItems: number = 1;

	const progress = totalItems ? ((inProgressItems / totalItems) * 100).toString() : '0';
</script>

<Card {...$$restProps}>
	<div class="flex flex-col">
		<P>{heading}</P>
		<P class="text-3xl font-bold mt-1">{inProgressItems}</P>
		<Progressbar class="mt-3" {progress} />
		<P class="mt-1 text-xs"
			>{$t('common.components.progressCard.totalProgress', { value: progress })}</P
		>
	</div>
</Card>
