<script>
	import { page } from '$app/stores';
	import { t } from '$lib/translations';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { useAuth } from '$lib/hooks/useAuth';

	const { isLoggedIn } = useAuth();
	$: activeUrl = $page.url.pathname;
</script>

<Navbar>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>{$t('common.appName')}</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		{#if isLoggedIn}
			<NavLi href="/.auth/logout">{$t('common.logout')}</NavLi>
		{:else}
			<NavLi href="/.auth/login/aad">{$t('common.login')}</NavLi>
		{/if}
	</NavUl>
</Navbar>
