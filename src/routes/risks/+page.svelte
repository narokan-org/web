<script lang="ts">
	import { Button, Heading } from 'flowbite-svelte';
	import TableSearch from '$lib/components/table-search/index.svelte';
	import { t } from '$lib/translations';

	let items: {}[] = [];
</script>

<div>
	<Heading level={2}>{$t('common.pages.risks.heading')}</Heading>

	<TableSearch
		placeholder={$t('common.pages.risks.table.searchPlaceholder')}
		headings={[
			$t('common.pages.risks.table.heading1'),
			$t('common.pages.risks.table.heading2'),
			$t('common.pages.risks.table.heading3'),
			$t('common.pages.risks.table.heading4'),
			$t('common.pages.risks.table.heading5'),
			$t('common.pages.risks.table.heading6'),
			$t('common.pages.risks.table.heading7'),
			$t('common.pages.risks.table.heading8'),
			$t('common.pages.risks.table.heading9'),
			$t('common.pages.risks.table.heading10')
		]}
		{items}
	/>

	{#if items.length === 0}
		<div class="flex justify-center mt-44">
			<Button>{$t('common.pages.risks.importRisksButton')}</Button>
		</div>
	{/if}
</div>
