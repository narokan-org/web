<script lang="ts">
	import PlusOutline from 'flowbite-svelte-icons/PlusOutline.svelte';
	import { Button, Heading, P, Input, Hr, ButtonGroup } from 'flowbite-svelte';
	import { t } from '$lib/translations';

	let emailInputs = [true, true, true, false, false];
	let addAnotherClickCount = 0;

	function addEmailInput() {
		if (addAnotherClickCount < 2) {
			emailInputs[3 + addAnotherClickCount] = true;
			addAnotherClickCount += 1;
		}
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen w-full">
	<div class="min-w-[600px]">
		<Heading data-testid="invite-heading" class="text-2xl" level={2}
			>{$t('common.pages.invite.heading')}</Heading
		>

		<P data-testid="invite-subheading" class="text-lg mt-2"
			>{$t('common.pages.invite.subheading')}</P
		>

		<form method="POST">
			<div class="mt-2">
				{#each emailInputs as visible, index}
					{#if visible}
						<Input
							id={`email-input-${index}`}
							class="text-sm mt-2"
							name={`email-${index}`}
							type="email"
							placeholder={$t('common.pages.invite.emailAddressInputPlaceholder')}
						/>
					{/if}
				{/each}
			</div>

			<div class="flex flex-row mt-2">
				{#if addAnotherClickCount < 2}
					<Button
						data-testid="invite-add-button"
						class="text-sm border-none flex-1 justify-start no-hover"
						color="alternative"
						type="button"
						on:click={addEmailInput}
					>
						<PlusOutline class="w-5 h-5 me-2" />
						{$t('common.pages.invite.addAnotherButtonLabel')}
					</Button>
				{/if}

				<Button class="text-sm ml-auto" data-testid="invite-send-button" type="submit"
					>{$t('common.pages.invite.sendButtonLabel')}</Button
				>
			</div>
		</form>

		<Hr class="mt-6" />

		<ButtonGroup class="w-full">
			<Input disabled type="text" value="" />
			<Button data-testid="invite-copy-button" color="primary"
				>{$t('common.pages.invite.copyInviteLabel')}</Button
			>
		</ButtonGroup>

		<div class="flex justify-center">
			<Button class="text-sm mt-12 " data-testid="invite-skip-button" href="/"
				>{$t('common.pages.invite.skipButtonLabel')}</Button
			>
		</div>
	</div>
</div>
