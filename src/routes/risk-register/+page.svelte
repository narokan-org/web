<script lang="ts">
	import { TableBody, TableHead, TableHeadCell, TableSearch, Button } from 'flowbite-svelte';
	import ProgressCard from '$lib/components/progress-card/index.svelte';
	import TrendCard from '$lib/components/trend-card/index.svelte';
	import CreateRiskFactorModal from '$lib/components/create-risk-factor-modal/index.svelte';
	import { Heading } from 'flowbite-svelte';
	import { t } from '$lib/translations';

	$: createRiskFactorModalOpen = false;

	function onCreateRiskFactorClick() {
		createRiskFactorModalOpen = true;
	}
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

	<div class="flex flex-col mt-8">
		<div class="flex gap-2 mb-2">
			<Button size="xs" color="primary" on:click={onCreateRiskFactorClick}
				>{$t('common.pages.riskRegister.table.primaryButton')}</Button
			>

			<Button color="alternative">{$t('common.pages.riskRegister.table.secondaryButton')}</Button>
		</div>

		<TableSearch placeholder={$t('common.pages.riskRegister.table.searchPlaceholder')}>
			<TableHead>
				<TableHeadCell>
					{$t('common.pages.riskRegister.table.heading1')}
				</TableHeadCell>
				<TableHeadCell>
					{$t('common.pages.riskRegister.table.heading2')}
				</TableHeadCell>
				<TableHeadCell>
					{$t('common.pages.riskRegister.table.heading3')}
				</TableHeadCell>
				<TableHeadCell>
					{$t('common.pages.riskRegister.table.heading4')}
				</TableHeadCell>
				<TableHeadCell>
					{$t('common.pages.riskRegister.table.heading5')}
				</TableHeadCell>
				<TableHeadCell>
					{$t('common.pages.riskRegister.table.heading6')}
				</TableHeadCell>
			</TableHead>
			<TableBody></TableBody>
		</TableSearch>
	</div>

	<CreateRiskFactorModal
		bind:isOpen={createRiskFactorModalOpen}
		riskCategories={[]}
		owners={[]}
		entities={[]}
		onSubmit={() => {
			console.log('submitted');
		}}
	/>
</div>
