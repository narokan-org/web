<script lang="ts">
	import { Heading, Button, Spinner } from 'flowbite-svelte';
	import { t } from '$lib/translations';
	import { enhance } from '$app/forms';
	import InputFormField from '$lib/components/input-form-field/index.svelte';
	import { createFormStore } from '$lib/stores/form-store';
	import { toastStore } from '$lib/stores/toast-store';

	export let workspaceName: string;

	let isSubmitting = false;

	const { currentFormState, isDirty, reset } = createFormStore({
		workspaceName
	});

	$: currentFormState.set({
		workspaceName
	});
</script>

<form
	method="post"
	action="?/update-general-settings"
	class="max-w-96"
	use:enhance={() => {
		isSubmitting = true;

		return async ({ result }) => {
			if (result.type === 'success') {
				toastStore.addToast($t('common.global.changesSaved'), 'success');
				reset();
			}
			isSubmitting = false;
		};
	}}
>
	<div class="flex flex-col gap-y-6 mt-6">
		<Heading tag="h6" class="text-gray-600"
			>{$t('common.components.generalSettings.manageWorkspace')}</Heading
		>

		<InputFormField
			label={$t('common.components.generalSettings.formFields.workspaceName')}
			name="workspaceName"
			required
			maxLength={16}
			bind:value={workspaceName}
		/>
	</div>

	<Button disabled={!$isDirty || isSubmitting} class="mt-6" type="submit"
		>{#if isSubmitting}<Spinner class="me-3" size="4" color="white" />{/if}{$t(
			isSubmitting
				? 'common.components.generalSettings.savingChanges'
				: 'common.components.generalSettings.saveButton'
		)}</Button
	>
</form>
