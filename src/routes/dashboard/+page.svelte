<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import { t } from '$lib/translations';
</script>

<div>
	<Heading data-testid="dashboard-heading" level={2}>{$t('common.pages.dashboard.heading')}</Heading
	>
</div>
