<script lang="ts">
	import { Button, Heading, Label, P, Input, Select, Hr, A } from 'flowbite-svelte';
	import { t } from '$lib/translations';

	let workspaceName = '';

	let workspaceLocation = 'us';
	let workspaceLocations = [
		{ value: 'us', name: $t('common.pages.onboarding.workspaceLocationInputOption1') },
		{ value: 'eu', name: $t('common.pages.onboarding.workspaceLocationInputOption2') }
	];

	let workspaceTeamSize = '';
	let workspaceTeamSizes = [
		{ value: '1', name: $t('common.pages.onboarding.teamSizeOption1') },
		{ value: '6', name: $t('common.pages.onboarding.teamSizeOption2') },
		{ value: '11', name: $t('common.pages.onboarding.teamSizeOption3') },
		{ value: '16', name: $t('common.pages.onboarding.teamSizeOption4') }
	];

	let role = '';
	let roles = [
		{ value: 'manager', name: $t('common.pages.onboarding.roleOption1') },
		{ value: 'analyst', name: $t('common.pages.onboarding.roleOption2') },
		{ value: 'c-level', name: $t('common.pages.onboarding.roleOption3') },
		{ value: 'specialist', name: $t('common.pages.onboarding.roleOption4') },
		{ value: 'director', name: $t('common.pages.onboarding.roleOption5') },
		{ value: 'stakeholder', name: $t('common.pages.onboarding.roleOption6') }
	];
	roles.sort((a, b) => a.value.localeCompare(b.value));
	roles.push({ value: 'other', name: $t('common.pages.onboarding.roleOption7') });
	function handleSubmit(event: Event) {
		event.preventDefault();
		console.log('Form submitted', workspaceName, workspaceLocation, workspaceTeamSize, role);
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen w-full">
	<div class="max-w-[400px]">
		<Heading class="text-2xl" level={2}>{$t('common.pages.onboarding.heading')}</Heading>

		<P class="text-lg mt-2">{$t('common.pages.onboarding.subheading')}</P>

		<form on:submit={handleSubmit}>
			<div class="mt-6">
				<Label class="text-sm" for="workspace-name-input"
					>{$t('common.pages.onboarding.workspaceNameInputLabel')}</Label
				>
				<Input
					id="workspace-name-input"
					class="text-sm mt-2"
					placeholder={$t('common.pages.onboarding.workspaceNameInputPlaceholder')}
					required
					maxlength="16"
					bind:value={workspaceName}
				/>
			</div>

			<div class="mt-6 flex items-center">
				<Label class="text-sm" for="workspace-location-input"
					>{$t('common.pages.onboarding.workspaceLocationInputLabel')}</Label
				>
				<Select
					class="text-sm ml-2 max-w-48"
					id="workspace-location-input"
					items={workspaceLocations}
					bind:value={workspaceLocation}
				/>
			</div>

			<Hr class="mt-6" />

			<div class="mt-6">
				<Label class="text-sm" for="team-size-input">
					{$t('common.pages.onboarding.teamSizeInputLabel')}
				</Label>
				<Select
					id="team-size-input"
					class="mt-2 text-sm"
					items={workspaceTeamSizes}
					placeholder={$t('common.pages.onboarding.teamSizeInputPlaceholder')}
					bind:value={workspaceTeamSize}
				/>
			</div>

			<div class="mt-6">
				<Label class="text-sm" for="role-input">
					{$t('common.pages.onboarding.roleInputLabel')}
				</Label>
				<Select
					id="role-input"
					class="mt-2 text-sm"
					items={roles}
					placeholder={$t('common.pages.onboarding.roleInputPlaceholder')}
					bind:value={role}
				/>
			</div>

			<Hr class="mt-6" />

			<Button class="w-full mt-6 text-sm" type="submit"
				>{$t('common.pages.onboarding.submitButton')}</Button
			>
		</form>
	</div>
</div>
