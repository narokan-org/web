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

<div>
	<Heading level={2}>{$t('common.pages.onboarding.heading')}</Heading>

	<P>{$t('common.pages.onboarding.subheading')}</P>

	<form on:submit={handleSubmit}>
		<div>
			<Label for="workspace-name-input"
				>{$t('common.pages.onboarding.workspaceNameInputLabel')}</Label
			>
			<Input
				id="workspace-name-input"
				placeholder={$t('common.pages.onboarding.workspaceNameInputPlaceholder')}
				required
				maxlength="16"
				bind:value={workspaceName}
			/>
		</div>

		<div>
			<Label for="workspace-location-input"
				>{$t('common.pages.onboarding.workspaceLocationInputLabel')}</Label
			>
			<Select
				id="workspace-location-input"
				items={workspaceLocations}
				bind:value={workspaceLocation}
			/>
		</div>

		<Hr />

		<div>
			<Label for="team-size-input">
				{$t('common.pages.onboarding.teamSizeInputLabel')}
			</Label>
			<Select
				id="team-size-input"
				items={workspaceTeamSizes}
				placeholder={$t('common.pages.onboarding.teamSizeInputPlaceholder')}
				bind:value={workspaceTeamSize}
			/>
		</div>

		<div>
			<Label for="role-input">
				{$t('common.pages.onboarding.roleInputLabel')}
			</Label>
			<Select
				id="role-input"
				items={roles}
				placeholder={$t('common.pages.onboarding.roleInputPlaceholder')}
				bind:value={role}
			/>
		</div>

		<Hr />

		<Button type="submit">{$t('common.pages.onboarding.submitButton')}</Button>
	</form>
</div>
