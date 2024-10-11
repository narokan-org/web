<script lang="ts">
	import { t } from '$lib/translations';
	import Page from '$lib/components/page/index.svelte';
	import EditProfile from '$lib/components/edit-profile/index.svelte';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { User } from '$lib/common/models/user';

	const { user } = getContext<{ user: Readable<User> }>('auth');
</script>

<Page heading={$t('common.pages.editProfile.heading')}>
	<div slot="content">
		<EditProfile fullName={$user.name} email={$user.email} />
	</div>
</Page>
