<script lang="ts">
	import CheckCircleSolid from 'flowbite-svelte-icons/CheckCircleSolid.svelte';
	import CloseCircleSolid from 'flowbite-svelte-icons/CloseCircleSolid.svelte';
	import { Toast } from 'flowbite-svelte';

	export let dismissable = false;
	export let icon: 'success' | 'error' = 'success';
</script>

<div {...$$restProps}>
	<Toast
		{dismissable}
		contentClass="flex space-x-4 rtl:space-x-reverse divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-700 items-center"
	>
		<div class="w-5 h-5 text-primary-600 dark:text-primary-500">
			{#if icon === 'success'}
				<CheckCircleSolid />
			{:else if icon === 'error'}
				<CloseCircleSolid />
			{/if}
		</div>
		<slot name="content"></slot>
	</Toast>
</div>
