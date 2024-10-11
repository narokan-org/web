<script lang="ts">
	import { TableBody, TableHead, TableHeadCell, TableSearch, Button } from 'flowbite-svelte';
	import ProgressCard from '$lib/components/progress-card/index.svelte';
	import TrendCard from '$lib/components/trend-card/index.svelte';
	import CreateRiskFactorModal from '$lib/components/create-risk-modal/index.svelte';
	import { t } from '$lib/translations';
	import Page from '$lib/components/page/index.svelte';
	import type { CreateRiskModalData } from '$lib/data-loaders/create-risk-modal';
	export let data: {
		createRiskModalData: CreateRiskModalData;
	};
	$: createRiskFactorModalOpen = false;
</script>

<Page heading={$t('common.pages.riskRegister.heading')}>
	<div slot="content">
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
				<Button
					size="xs"
					color="primary"
					on:click={() => {
						createRiskFactorModalOpen = true;
					}}>{$t('common.pages.riskRegister.table.primaryButton')}</Button
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
			likelihoodOptions={data.createRiskModalData.likelihoodOptions}
			impactOptions={data.createRiskModalData.impactOptions}
			responseOptions={data.createRiskModalData.responseOptions.map((r) => ({
				name: r.name,
				value: r.id.toString()
			}))}
			riskCategories={data.createRiskModalData.categories.map((c) => ({
				name: c.name,
				value: c.id
			})) ?? []}
			owners={data.createRiskModalData.owners.map((o) => ({
				name: o.name,
				value: o.id.toString()
			}))}
			entities={data.createRiskModalData.entities.map((e) => ({
				name: e.name,
				value: e.id.toString()
			}))}
			selectedEntities={[data.createRiskModalData.currentEntity?.id.toString() ?? '']}
			selectedOwners={[data.createRiskModalData.currentUser?.id.toString() ?? '']}
		/>
	</div>
</Page>
