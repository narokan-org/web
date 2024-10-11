<script lang="ts">
	import EyeOutline from 'flowbite-svelte-icons/EyeOutline.svelte';
	import EyeSlashOutline from 'flowbite-svelte-icons/EyeSlashOutline.svelte';
	import { Input, Button, Label, Heading, P, Spinner, Helper } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { createFormStore } from '$lib/stores/form-store';
	import { toastStore } from '$lib/stores/toast-store';

	import { t } from '$lib/translations';
	import { invalidate } from '$app/navigation';

	export let fullName: string;
	export let email: string;

	let password = '';
	let confirmPassword = '';
	let showPassword = false;
	let showConfirmPassword = false;
	let isSubmitting = false;
	let passwordMismatch = false;

	const { currentFormState, isDirty } = createFormStore({
		fullName,
		password: '',
		confirmPassword: ''
	});

	function validateForm() {
		passwordMismatch = password !== confirmPassword;

		return !passwordMismatch;
	}

	$: currentFormState.set({
		fullName,
		password,
		confirmPassword
	});
</script>

<form
	method="POST"
	action="?/edit-profile"
	class="max-w-96"
	use:enhance={({ cancel }) => {
		isSubmitting = true;

		if (!validateForm()) {
			isSubmitting = false;
			cancel();
			return;
		}

		return async ({ result }) => {
			if (result.type === 'success') {
				toastStore.addToast($t('common.global.changesSaved'), 'success');
			}
			await invalidate('app:user');
			isSubmitting = false;
		};
	}}
>
	<div class="flex flex-col gap-y-6 mt-6">
		<Heading tag="h6" class="text-gray-600"
			>{$t('common.components.editProfile.personalInformation')}</Heading
		>
		<Label class="mt-3"
			>{$t('common.components.editProfile.formFields.fullName')}<span class="text-red-500">*</span>
			<Input name="fullName" class="mt-1" bind:value={fullName} required />
		</Label>

		<div>
			<Label class="text-black"
				>{$t('common.components.editProfile.formFields.email')}
				<Input class="mt-1" name="email" value={email} disabled />
			</Label>
		</div>

		<Heading tag="h6" class="text-gray-600 mt-10"
			>{$t('common.components.editProfile.changePassword')}</Heading
		>
		<div>
			<Label
				><span class={passwordMismatch ? 'text-red-700' : ''}
					>{$t('common.components.editProfile.formFields.password')}</span
				><span class="text-red-700">*</span>
				<Input
					class={`mt-1 ${passwordMismatch ? 'border-red-700' : ''}`}
					name="password"
					type={showPassword ? 'text' : 'password'}
					size="lg"
					on:keypress={() => (passwordMismatch = false)}
					bind:value={password}
				>
					<button
						slot="right"
						type="button"
						on:click={() => (showPassword = !showPassword)}
						class="pointer-events-auto"
					>
						{#if showPassword}
							<EyeOutline class="w-6 h-6" />
						{:else}
							<EyeSlashOutline class="w-6 h-6" />
						{/if}
					</button>
				</Input>
				<P class={`text-sm text-gray-500 mt-1 ${passwordMismatch ? 'text-red-700' : ''}`}>
					{$t('common.components.editProfile.passwordInstructions')}
				</P>
				{#if passwordMismatch}
					<Helper class="mt-2" color="red"
						><span class="font-medium">{$t('common.components.editProfile.passwordMismatch')}</span
						></Helper
					>
				{/if}
			</Label>
		</div>
		<div>
			<Label
				><span class={passwordMismatch ? 'text-red-700' : ''}
					>{$t('common.components.editProfile.formFields.confirmPassword')}</span
				><span class="text-red-700">*</span>
				<Input
					class={`mt-1 ${passwordMismatch ? 'border-red-700' : ''}`}
					name="confirmPassword"
					type={showConfirmPassword ? 'text' : 'password'}
					size="lg"
					on:keypress={() => (passwordMismatch = false)}
					bind:value={confirmPassword}
				>
					<button
						slot="right"
						type="button"
						on:click={() => (showConfirmPassword = !showConfirmPassword)}
						class="pointer-events-auto"
					>
						{#if showConfirmPassword}
							<EyeOutline class="w-6 h-6" />
						{:else}
							<EyeSlashOutline class="w-6 h-6" />
						{/if}
					</button>
				</Input>
				{#if passwordMismatch}
					<Helper class="mt-2" color="red"
						><span class="font-medium">{$t('common.components.editProfile.passwordMismatch')}</span
						></Helper
					>
				{/if}
			</Label>
		</div>
	</div>
	<Button disabled={!$isDirty || isSubmitting} class="mt-6" type="submit"
		>{#if isSubmitting}<Spinner class="me-3" size="4" color="white" />{/if}{$t(
			isSubmitting
				? 'common.components.editProfile.savingChanges'
				: 'common.components.editProfile.saveButton'
		)}</Button
	>
</form>
