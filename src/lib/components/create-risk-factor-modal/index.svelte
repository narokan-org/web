<script lang="ts">
	import {
		Modal,
		Tabs,
		TabItem,
		Label,
		Input,
		Textarea,
		Select,
		MultiSelect,
		Button
	} from 'flowbite-svelte';
	import { t } from '$lib/translations';
	import type { RiskCategory } from '$lib/common/models/risk-category';

	let selectedRiskCategory: number;
	let selectedOwners: string[] = [];
	let selectedEntities: string[] = [];
	export let isOpen: boolean = false;
	export let riskCategories: RiskCategory[];
	export let owners: { name: string; userId: string }[];
	export let entities: { companyId: string; name: string }[];
	export let onSubmit: () => void;
</script>

<div {...$$restProps}>
	<Modal
		footerClass="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse rounded-b-lg justify-end"
		title={$t('common.components.createRiskFactorModal.heading')}
		bind:open={isOpen}
	>
		<form method="post" on:submit={onSubmit}>
			<Tabs tabStyle="underline">
				<TabItem open title={$t('common.components.createRiskFactorModal.tab1.heading')}>
					<div class="flex flex-col">
						<Label
							>{$t('common.components.createRiskFactorModal.tab1.formFields.title')}
							<Input
								class="mt-2"
								type="text"
								name="title"
								placeholder={$t(
									'common.components.createRiskFactorModal.tab1.formFields.titlePlaceholder'
								)}
								required
							/>
						</Label>

						<Label class="mt-4">
							{$t('common.components.createRiskFactorModal.tab1.formFields.description')}
							<Textarea
								class="mt-2"
								name="description"
								rows={4}
								placeholder={$t(
									'common.components.createRiskFactorModal.tab1.formFields.descriptionPlaceholder'
								)}
							/>
						</Label>

						<div class="flex gap-2 mt-4">
							<div class="flex flex-col flex-1">
								<Label>
									{$t('common.components.createRiskFactorModal.tab1.formFields.category')}

									<Select
										class="mt-2"
										items={riskCategories.map((c) => ({ name: c.name, value: c.id }))}
										name="category"
										bind:value={selectedRiskCategory}
										placeholder={$t(
											'common.components.createRiskFactorModal.tab1.formFields.categoryPlaceholder'
										)}
									/>
								</Label>
							</div>
							<div class="flex flex-col flex-1">
								<Label>
									{$t('common.components.createRiskFactorModal.tab1.formFields.owners')}

									<MultiSelect
										class="mt-2"
										items={owners.map((o) => ({ name: o.name, value: o.userId }))}
										name="owners"
										required
										bind:value={selectedOwners}
										placeholder={$t(
											'common.components.createRiskFactorModal.tab1.formFields.ownersPlaceholder'
										)}
									/>
								</Label>
							</div>
						</div>

						<Label class="mt-4">
							{$t('common.components.createRiskFactorModal.tab1.formFields.entity')}

							<Select
								items={entities.map((e) => ({ name: e.name, value: e.companyId }))}
								bind:value={selectedEntities}
								name="entities"
								required
								placeholder={$t(
									'common.components.createRiskFactorModal.tab1.formFields.entityPlaceholder'
								)}
							/>
						</Label>
					</div>
				</TabItem>

				<TabItem title={$t('common.components.createRiskFactorModal.tab2.heading')}></TabItem>

				<TabItem title={$t('common.components.createRiskFactorModal.tab3.heading')}></TabItem>
			</Tabs>
		</form>
		<svelte:fragment slot="footer">
			<Button
				on:click={() => {
					isOpen = false;
				}}
				color="alternative"
			>
				{$t('common.components.createRiskFactorModal.secondaryButton')}
			</Button>
			<Button type="submit">
				{$t('common.components.createRiskFactorModal.primaryButton')}
			</Button>
		</svelte:fragment>
	</Modal>
</div>
