<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import { t } from '$lib/translations';
	import EditProfile from '$lib/components/edit-profile/index.svelte';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { User } from '$lib/common/models/user';

	const { user } = getContext<{ user: Readable<User> }>('auth');
</script>

<div class="flex flex-col mt-2">
	<Heading class="text-2xl font-bold" tag="h4">{$t('common.pages.editProfile.heading')}</Heading>
	<EditProfile fullName={$user.name} email={$user.email} />
</div>
