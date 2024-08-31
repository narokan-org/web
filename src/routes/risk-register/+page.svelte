<script lang="ts">
	import ProgressCard from '$lib/components/progress-card/index.svelte';
	import TrendCard from '$lib/components/trend-card/index.svelte';
	import { Heading } from 'flowbite-svelte';
	import { t } from '$lib/translations';
</script>

<div class="flex flex-col">
	<Heading class="text-2xl font-bold">{$t('common.pages.riskRegister.heading')}</Heading>
	<div class="flex flex-row gap-4 mt-8">
		<TrendCard
			footer={$t('common.pages.riskRegister.residualRiskTrendCard.footer')}
			count={40}
			percentage={10}
			label="Low"
		/>
		<ProgressCard
			class="min-w-80"
			heading={$t('common.pages.riskRegister.mitigationPlansCard.heading')}
			inProgressItems={0}
			totalItems={0}
		/>
	</div>
</div>
