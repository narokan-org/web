<script lang="ts">
	import { Input, Button, Label } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	import { t } from '$lib/translations';
	import { invalidate } from '$app/navigation';

	export let fullName: string;
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

		<Button type="submit">{$t('common.components.editProfile.saveButton')}</Button>
	</div>
</form>
