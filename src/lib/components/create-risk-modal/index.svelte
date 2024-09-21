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

	let title: string;
	let description: string;
	let notes: string;
	let selectedRiskCategory: number;
	let selectedLikelihood: number;
	let selectedImpact: number;
	let selectedResponse: string;

	export let likelihoodOptions: { name: string; value: number }[];
	export let impactOptions: { name: string; value: number }[];
	export let responseOptions: { name: string; value: string }[];

	export let selectedEntities: string[] = [];
	export let entities: { name: string; value: string }[];

	export let selectedOwners: string[] = [];
	export let owners: { name: string; value: string }[];

	export let riskCategories: { name: string; value: number }[];

	export let isOpen: boolean = false;
	$: inherentRisk =
		selectedLikelihood === undefined && selectedImpact === undefined
			? 0
			: selectedLikelihood * selectedImpact;
	export const residualRisk: string = $t(
		'common.components.createRiskFactorModal.tab2.formFields.scorePlaceholder'
	);
	export const riskTolerance: string = $t(
		'common.components.createRiskFactorModal.tab2.formFields.scorePlaceholder'
	);

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		const form = document.getElementById('create-risk-factor-form') as HTMLFormElement;

		if (form.checkValidity()) {
			form.submit();
		} else {
			form.reportValidity();
		}
	};
</script>

<div {...$$restProps}>
	<Modal
		footerClass="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse rounded-b-lg justify-end"
		title={$t('common.components.createRiskFactorModal.heading')}
		bind:open={isOpen}
	>
		<form id="create-risk-factor-form" method="post" action="?/create-risk">
			<input type="hidden" name="title" bind:value={title} />
			<input type="hidden" name="description" bind:value={description} />
			<input type="hidden" name="category" bind:value={selectedRiskCategory} />
			<input type="hidden" name="likelihood" bind:value={selectedLikelihood} />
			<input type="hidden" name="impact" bind:value={selectedImpact} />
			<input type="hidden" name="response" bind:value={selectedResponse} />
			<input type="hidden" name="notes" bind:value={notes} />
			{#each selectedOwners as owner}
				<input type="hidden" name="owners" value={owner} />
			{/each}
			{#each selectedEntities as entity}
				<input type="hidden" name="entities" value={entity} />
			{/each}
		</form>
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
							bind:value={title}
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
							bind:value={description}
						/>
					</Label>

					<div class="flex gap-2 mt-4">
						<div class="flex flex-col flex-1">
							<Label>
								{$t('common.components.createRiskFactorModal.tab1.formFields.category')}

								<Select
									class="mt-2"
									items={riskCategories.map((c) => ({ name: c.name, value: c.value }))}
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
									items={owners.map((o) => ({ name: o.name, value: o.value }))}
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

						<MultiSelect
							items={entities.map((e) => ({ name: e.name, value: e.value }))}
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

			<TabItem title={$t('common.components.createRiskFactorModal.tab2.heading')}>
				<div class="flex flex-col">
					<div class="flex gap-2">
						<Label class="flex-1">
							{$t('common.components.createRiskFactorModal.tab2.formFields.likelihood')}

							<Select
								class="mt-2"
								items={likelihoodOptions}
								name="likelihood"
								bind:value={selectedLikelihood}
								placeholder={$t(
									'common.components.createRiskFactorModal.tab2.formFields.likelihoodPlaceholder'
								)}
							/>
						</Label>
						<Label class="flex-1">
							{$t('common.components.createRiskFactorModal.tab2.formFields.impact')}

							<Select
								class="mt-2"
								items={impactOptions}
								name="impact"
								bind:value={selectedImpact}
								placeholder={$t(
									'common.components.createRiskFactorModal.tab2.formFields.impactPlaceholder'
								)}
							/>
						</Label>
					</div>

					<div class="flex mt-4">
						<div class="flex flex-col flex-1">
							<span class="text-sm"
								>{$t('common.components.createRiskFactorModal.tab2.formFields.inherentRisk')}</span
							>
							<span class="text-sm"
								>{inherentRisk === 0
									? $t('common.components.createRiskFactorModal.tab2.formFields.scorePlaceholder')
									: inherentRisk}</span
							>
						</div>

						<div class="flex flex-col flex-1">
							<span class="text-sm"
								>{$t('common.components.createRiskFactorModal.tab2.formFields.residualRisk')}</span
							>
							<span class="text-sm">{residualRisk}</span>
						</div>

						<div class="flex flex-col flex-1">
							<span class="text-sm"
								>{$t('common.components.createRiskFactorModal.tab2.formFields.riskTolerance')}</span
							>
							<span class="text-sm">{riskTolerance}</span>
						</div>
					</div>

					<Label class="mt-4 flex-grow">
						{$t('common.components.createRiskFactorModal.tab2.formFields.response')}

						<Select
							class="mt-2"
							items={responseOptions}
							name="response"
							bind:value={selectedResponse}
							placeholder={$t(
								'common.components.createRiskFactorModal.tab2.formFields.responsePlaceholder'
							)}
						/>
					</Label>

					<Label class="mt-4">
						{$t('common.components.createRiskFactorModal.tab2.formFields.notes')}
						<Textarea
							class="mt-2"
							name="notes"
							rows={4}
							bind:value={notes}
							placeholder={$t(
								'common.components.createRiskFactorModal.tab2.formFields.notesPlaceholder'
							)}
						/>
					</Label>
				</div>
			</TabItem>

			<TabItem title={$t('common.components.createRiskFactorModal.tab3.heading')}></TabItem>
		</Tabs>
		<svelte:fragment slot="footer">
			<Button
				on:click={() => {
					isOpen = false;
				}}
				color="alternative"
			>
				{$t('common.components.createRiskFactorModal.secondaryButton')}
			</Button>
			<Button on:click={handleSubmit}>
				{$t('common.components.createRiskFactorModal.primaryButton')}
			</Button>
		</svelte:fragment>
	</Modal>
</div>
