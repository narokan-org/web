<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import { t } from '$lib/translations';
	import GeneralSettings from '$lib/components/general-settings/index.svelte';
	import type { Company } from '$lib/common/models/company';

	export let data: { company: Company };
</script>

<div class="flex flex-col mt-2">
	<Heading class="text-2xl font-bold" tag="h4">{$t('common.pages.generalSettings.heading')}</Heading
	>
	<GeneralSettings workspaceName={data.company.name} />
</div>
