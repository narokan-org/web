<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import { t } from '$lib/translations';
</script>

<div>
	<Heading data-testid="assessments-heading" level={2}
		>{$t('common.pages.assessments.heading')}</Heading
	>
</div>
