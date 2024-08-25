<script lang="ts">
	import { Toast } from 'flowbite-svelte';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';
	export let dismissable = false;
	export let icon: 'success' = 'success';
</script>

<div {...$$restProps}>
	<Toast {dismissable}>
		{#if icon === 'success'}
			<CheckCircleSolid />
		{/if}
		<slot name="content"></slot>
	</Toast>
</div>
