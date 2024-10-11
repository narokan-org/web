<script lang="ts">
	import ArrowUpOutline from 'flowbite-svelte-icons/ArrowUpOutline.svelte';
	import ArrowDownOutline from 'flowbite-svelte-icons/ArrowDownOutline.svelte';
	import { Card, P, Badge, type ColorVariant } from 'flowbite-svelte';

	export let footer: string;
	export let count: number;
	export let percentage: number;
	export let label: 'Low' | 'Medium' | 'High';

	const color: Record<'Low' | 'Medium' | 'High', ColorVariant> = {
		Low: 'green',
		Medium: 'yellow',
		High: 'red'
	};

	const bgColor = color[label];
</script>

<Card {...$$restProps} class="flex flex-row min-w-80">
	<div class="flex flex-col flex-1">
		<P class="text-3xl font-bold mt-1">{count}</P>
		<Badge color={bgColor} class="mt-1 max-w-16">{label}</Badge>
		<P class="mt-1">{footer}</P>
	</div>
	<div class="flex flex-col justify-center">
		<div class="flex flex-row">
			<P class={percentage > 0 ? 'text-green-600' : percentage < 0 ? 'text-red-600' : ''}
				>{percentage}%</P
			>
			<span class="p-0.5">
				{#if percentage > 0}
					<ArrowUpOutline
						class={percentage > 0 ? 'text-green-600' : percentage < 0 ? 'text-red-600' : ''}
					/>
				{:else if percentage < 0}
					<ArrowDownOutline
						class={percentage > 0 ? 'text-green-600' : percentage < 0 ? 'text-red-600' : ''}
					/>
				{/if}
			</span>
		</div>
	</div>
</Card>
