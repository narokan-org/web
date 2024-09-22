<script lang="ts">
	import { Input, Button, Label, P } from 'flowbite-svelte';
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
		<Label
			>{$t('common.components.editProfile.formFields.fullName')}
			<Input name="fullName" class="mt-3" bind:value={fullName} required />
		</Label>

		<div>
			<Label>{$t('common.components.editProfile.formFields.email')}</Label>
			<P class="mt-3">{email}</P>
		</div>

		<div>
			<Label
				>{$t('common.components.editProfile.formFields.password')}
				<Input class="mt-3" name="password" type={showPassword ? 'text' : 'password'} size="lg">
					<button
						slot="left"
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
			</Label>
		</div>
		<div>
			<Label
				>{$t('common.components.editProfile.formFields.confirmPassword')}
				<Input
					class="mt-3"
					name="confirmPassword"
					type={showConfirmPassword ? 'text' : 'password'}
					size="lg"
				>
					<button
						slot="left"
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
		<Button type="submit">{$t('common.components.editProfile.saveButton')}</Button>
	</div>
</form>
