<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { navigating } from '$app/stores';
	import { t } from '$lib/translations';
	import Header from '$lib/components/navigation/index.svelte';
	import type { User } from '$lib/common/models/user';
	import { isOnboardingPath } from '$lib/utils/utils';
	import { page } from '$app/stores';
	import { toastStore } from '$lib/stores/toast-store';
	import Toast from '$lib/components/toast/index.svelte';
	import LoadingIndicator from '$lib/components/loading-indicator/index.svelte';
	import '../app.css';

	export let data: { isLoggedIn: boolean; user: User };
	const isLoggedIn = writable(false);
	isLoggedIn.set(data.isLoggedIn);

	const user = writable<User>();
	user.set(data.user);

	setContext('auth', { isLoggedIn, user });

	$: showLoggedInLayout = data && data.isLoggedIn && !isOnboardingPath($page.url.pathname);
</script>

<div class={showLoggedInLayout ? 'flex bg-gray-50 min-h-screen' : ''}>
	<Header class={showLoggedInLayout ? 'w-auto' : ''} />

	<main class="mx-4 {showLoggedInLayout ? 'mt-4' : ''} w-full">
		{#if $navigating}
			<LoadingIndicator message={$t('common.global.loading')} />
		{:else}
			<slot></slot>
		{/if}
	</main>

	<div class="fixed bottom-0 right-0 p-4 space-y-4">
		{#each $toastStore as toast (toast.id)}
			<Toast dismissable={toast.dismissable} on:close={() => toastStore.removeToast(toast.id)}>
				<span class="ps-4" slot="content">{toast.message}</span>
			</Toast>
		{/each}
	</div>
</div>
