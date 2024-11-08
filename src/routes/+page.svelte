<script lang="ts">
	import PlusOutline from 'flowbite-svelte-icons/PlusOutline.svelte';
	import UploadOutline from 'flowbite-svelte-icons/UploadOutline.svelte';
	import { Heading, P, Img, Input, Button, Table, TableHead, TableHeadCell } from 'flowbite-svelte';
	import ProgressCard from '$lib/components/progress-card/index.svelte';
	import { getContext } from 'svelte';
	import { readable } from 'svelte/store';
	import { t } from '$lib/translations';
	import Feature from '$lib/components/feature/index.svelte';
	import type { Readable } from 'svelte/store';
	import type { User } from '$lib/common/models/user';
	import { toastStore } from '$lib/stores/toast-store';
	import CreateRiskFactorModal from '$lib/components/create-risk-modal/index.svelte';
	import type { CreateRiskModalData } from '$lib/data-loaders/create-risk-modal';
	const { isLoggedIn, user } = getContext<{ isLoggedIn: Readable<boolean>; user: Readable<User> }>(
		'auth'
	) ?? { isLoggedIn: readable(false), user: readable(null) };

	let email = '';
	let isSubmitting = false;
	export let data: { createRiskModal: CreateRiskModalData };

	$: createRiskFactorModalOpen = false;

	async function handleSignUp(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		isSubmitting = true;

		try {
			const response = await fetch('https://api.getwaitlist.com/api/v1/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					waitlist_id: '19478'
				})
			});

			if (!response.ok) {
				return null;
			}

			const waitlistInfo: { created_at: string } = await response.json();

			const createdAt = new Date(waitlistInfo.created_at.split('_')[0]);

			const createdAtDate = new Date(
				createdAt.getFullYear(),
				createdAt.getMonth(),
				createdAt.getDate()
			);
			const now = new Date();
			const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

			toastStore.addToast(
				$t(
					`common.pages.home.${createdAtDate < currentDate ? 'waitlistAlreadyOnWaitlistMessage' : 'waitlistSuccessMessage'}`
				),
				'success',
				true
			);
		} catch {
			toastStore.addToast($t('common.pages.home.waitlistErrorMessage'), 'error', true);
		}

		isSubmitting = false;
		form.reset();
	}
</script>

{#if !$isLoggedIn}
	<div class="flex flex-col items-center justify-center min-h-screen w-full">
		<div class="max-w-[1400px]">
			<div class="flex flex-row">
				<div class="flex flex-col flex-1 justify-center">
					<Heading data-testid="home-heading" class="text-6xl" level={1}
						>{$t('common.pages.home.heading')}</Heading
					>
					<P data-testid="home-subheading" class="text-xl mt-6"
						>{$t('common.pages.home.subheading')}</P
					>
					<form class="flex flex-row items-end max-w-[450px]" on:submit={handleSignUp}>
						<Input
							required
							type="email"
							name="email"
							bind:value={email}
							data-testid="home-waitlist-input"
							class="text-sm mt-8"
							placeholder={$t('common.pages.home.waitlistInputPlaceholder')}
						/>
						<Button
							disabled={isSubmitting}
							type="submit"
							data-testid="home-waitlist-button"
							class="text-xs ml-4 h-10 min-w-[120px]"
							>{$t('common.pages.home.waitlistButton')}</Button
						>
					</form>
				</div>
				<Img data-testid="home-hero-image" src="/images/home-graphs-content.png" />
			</div>
			<div class="flex flex-row mt-8">
				<Feature
					class="flex-1 mr-8"
					key="1"
					heading={$t('common.pages.home.feature1Heading')}
					subheading={$t('common.pages.home.feature1Subheading')}
				>
					<!-- TODO: Fix icon positioning. -->
					<!-- <BrainSolid slot="icon" /> -->
				</Feature>
				<Feature
					class="flex-1 mr-8"
					key="2"
					heading={$t('common.pages.home.feature2Heading')}
					subheading={$t('common.pages.home.feature2Subheading')}
				>
					<!-- TODO: Fix icon positioning. -->
					<!-- <LockSolid slot="icon" /> -->
				</Feature>
				<Feature
					class="flex-1 mr-8"
					key="3"
					heading={$t('common.pages.home.feature3Heading')}
					subheading={$t('common.pages.home.feature3Subheading')}
				>
					<!-- TODO: Fix icon positioning. -->
					<!-- <FileChartBarSolid slot="icon" /> -->
				</Feature>
			</div>
		</div>
	</div>
{:else}
	<div class="flex flex-col">
		<Heading class="text-2xl font-bold"
			>{$t('common.pages.home.loggedIn.heading', { placeholder: $user.name })}</Heading
		>
		<P class="mt-2">{$t('common.pages.home.loggedIn.subheading')}</P>

		<div class="flex flex-row mt-10 gap-4">
			<ProgressCard
				class="min-w-80"
				heading={$t('common.pages.home.loggedIn.progressCard1Heading')}
				inProgressItems={0}
				totalItems={0}
			/>
			<ProgressCard
				class="min-w-80"
				heading={$t('common.pages.home.loggedIn.progressCard2Heading')}
				inProgressItems={0}
				totalItems={0}
			/>
			<ProgressCard
				class="min-w-80"
				heading={$t('common.pages.home.loggedIn.progressCard3Heading')}
				inProgressItems={0}
				totalItems={0}
			/>
		</div>

		<div class="flex flex-row mt-8 gap-8">
			<div class="flex flex-col">
				<P class="text-xl font-semibold">{$t('common.pages.home.loggedIn.risksTable.heading')}</P>

				<div class="flex flex-col border mt-4 min-h-96">
					<Table striped class="bg-white">
						<TableHead class="uppercase bg-gray-200">
							<TableHeadCell>{$t('common.pages.home.loggedIn.risksTable.column1')}</TableHeadCell>

							<TableHeadCell>{$t('common.pages.home.loggedIn.risksTable.column2')}</TableHeadCell>

							<TableHeadCell>{$t('common.pages.home.loggedIn.risksTable.column3')}</TableHeadCell>

							<TableHeadCell>{$t('common.pages.home.loggedIn.risksTable.column4')}</TableHeadCell>
						</TableHead>
					</Table>
					<!-- TODO: If there is no data, only then we will show this. Need to figure out that criteria. Same for the other table. -->
					<div class="flex flex-grow h-full justify-center items-center gap-2">
						<Button
							color="alternative"
							on:click={() => {
								createRiskFactorModalOpen = true;
							}}
							><PlusOutline class="mr-1" />{$t(
								'common.pages.home.loggedIn.createRiskButton'
							)}</Button
						>
						<Button color="alternative"
							><UploadOutline class="mr-1" />{$t(
								'common.pages.home.loggedIn.bulkUploadButton'
							)}</Button
						>
					</div>
				</div>
			</div>

			<div class="flex flex-col">
				<P class="text-xl font-semibold">{$t('common.pages.home.loggedIn.controlsTable.heading')}</P
				>
				<div class="flex flex-col border mt-4 min-h-96">
					<Table striped class="bg-white">
						<TableHead class="uppercase bg-gray-200">
							<TableHeadCell>{$t('common.pages.home.loggedIn.controlsTable.column1')}</TableHeadCell
							>

							<TableHeadCell>{$t('common.pages.home.loggedIn.controlsTable.column2')}</TableHeadCell
							>

							<TableHeadCell>{$t('common.pages.home.loggedIn.controlsTable.column3')}</TableHeadCell
							>

							<TableHeadCell>{$t('common.pages.home.loggedIn.controlsTable.column4')}</TableHeadCell
							>
						</TableHead>
					</Table>
					<!-- TODO: If there is no data, only then we will show this. Need to figure out that criteria. Same for the other table. -->
					<div class="flex flex-grow h-full justify-center items-center gap-2">
						<Button color="alternative"
							><PlusOutline class="mr-1" />{$t(
								'common.pages.home.loggedIn.createControlButton'
							)}</Button
						>
						<Button color="alternative"
							><UploadOutline class="mr-1" />{$t(
								'common.pages.home.loggedIn.bulkUploadButton'
							)}</Button
						>
					</div>
				</div>
			</div>
		</div>
		<CreateRiskFactorModal
			bind:isOpen={createRiskFactorModalOpen}
			likelihoodOptions={data.createRiskModal.likelihoodOptions}
			impactOptions={data.createRiskModal.impactOptions}
			responseOptions={data.createRiskModal.responseOptions.map((r) => ({
				name: r.name,
				value: r.id.toString()
			}))}
			riskCategories={data.createRiskModal.categories.map((c) => ({
				name: c.name,
				value: c.id
			}))}
			owners={data.createRiskModal.owners.map((o) => ({
				name: o.name,
				value: o.id.toString()
			}))}
			entities={data.createRiskModal.entities.map((e) => ({
				name: e.name,
				value: e.id.toString()
			}))}
			selectedEntities={[data.createRiskModal.currentEntity?.id.toString() ?? '']}
			selectedOwners={[data.createRiskModal.currentUser?.id.toString() ?? '']}
		/>
	</div>
{/if}
