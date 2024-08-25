<script lang="ts">
	import { ButtonGroup, Button, Popover } from 'flowbite-svelte';
	import { t } from '$lib/translations';

	export let triggeredBy: string;
</script>

<div {...$$restProps}>
	<Popover trigger="click" placement="right" arrow={false} {triggeredBy} offset={25}>
		<div class="flex flex-col max-w-56">
			<ButtonGroup divClass="flex flex-col">
				<Button href="/profile" class="border-none hover:rounded-none"
					>{$t('common.components.userPopover.profileButton')}</Button
				>
				<Button href="/notifications" class="border-none hover:rounded-none"
					>{$t('common.components.userPopover.notificationsButton')}</Button
				>
				<Button href="/logout" class="border-none hover:rounded-none"
					>{$t('common.components.userPopover.signOutButton')}</Button
				>
			</ButtonGroup>
		</div>
	</Popover>
</div>
