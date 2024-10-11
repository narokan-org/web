<script lang="ts">
	import { t } from '$lib/translations';
	import Page from '$lib/components/page/index.svelte';
	import GeneralSettings from '$lib/components/general-settings/index.svelte';
	import type { Company } from '$lib/common/models/company';

	export let data: { company: Company };
</script>

<Page heading={$t('common.pages.generalSettings.heading')}>
	<div slot="content">
		<GeneralSettings workspaceName={data.company.name} />
	</div>
</Page>
