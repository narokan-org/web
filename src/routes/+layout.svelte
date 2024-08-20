<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Header from '$lib/components/navigation/index.svelte';
	import type { User } from '$lib/common/models/user';
	import { isOnboardingPath } from '$lib/utils/utils';
	import { page } from '$app/stores';
	import '../app.css';

	export let data: { isLoggedIn: boolean; user: User };
	const isLoggedIn = writable(false);
	const user = writable<User>();

	isLoggedIn.set(data.isLoggedIn);
	user.set(data.user);

	setContext('auth', { isLoggedIn, user });
</script>

<div class={$isLoggedIn && !isOnboardingPath($page.url.pathname) ? 'flex' : ''}>
	<Header class={$isLoggedIn && !isOnboardingPath($page.url.pathname) ? 'w-auto' : ''} />

	<main class="mx-4">
		<slot></slot>
	</main>
</div>
