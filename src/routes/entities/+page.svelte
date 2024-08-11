<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import { t } from '$lib/translations';
</script>

<div>
	<Heading data-testid="entities-heading" level={2}>{$t('common.pages.entities.heading')}</Heading>
</div>
