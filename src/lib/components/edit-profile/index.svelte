<script lang="ts">
	import { Input, Button, Label, Heading, P } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';

	import { t } from '$lib/translations';
	import { invalidate } from '$app/navigation';

	export let fullName: string;
	export let email: string;

	let showPassword = false;
	let showConfirmPassword = false;
</script>

<form
	method="POST"
	action="?/edit-profile"
	class="max-w-96"
	use:enhance={() => {
		return async () => {
			await invalidate('app:user');
		};
	}}
>
	<div class="flex flex-col gap-y-6 mt-6">
		<Heading tag="h6" class="text-gray-600"
			>{$t('common.components.editProfile.personalInformation')}</Heading
		>
		<Label class="mt-3"
			>{$t('common.components.editProfile.formFields.fullName')}
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
				>{$t('common.components.editProfile.formFields.password')}<span class="text-red-500">*</span
				>
				<Input class="mt-1" name="password" type={showPassword ? 'text' : 'password'} size="lg">
					<button
						slot="right"
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
				<P class="text-sm text-gray-500 mt-1">
					{$t('common.components.editProfile.passwordInstructions')}
				</P>
			</Label>
		</div>
		<div>
			<Label
				>{$t('common.components.editProfile.formFields.confirmPassword')}<span class="text-red-500"
					>*</span
				>
				<Input
					class="mt-1"
					name="confirmPassword"
					type={showConfirmPassword ? 'text' : 'password'}
					size="lg"
					autocomplete="off"
				>
					<button
						slot="right"
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
			</Label>
		</div>
	</div>
	<Button class="mt-6" type="submit">{$t('common.components.editProfile.saveButton')}</Button>
</form>
