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
			<NavLi href="/dashboard">{$t('common.dashboard')}</NavLi>
			<NavLi href="/risks">{$t('common.risks')}</NavLi>
			<NavLi href="/controls">{$t('common.controls')}</NavLi>
			<NavLi href="/assessments">{$t('common.assessments')}</NavLi>
			<NavLi href="/entities">{$t('common.entities')}</NavLi>
			<NavLi href="/settings">{$t('common.settings')}</NavLi>
			<NavLi href="/logout">{$t('common.logout')}</NavLi>
		{:else}
			<NavLi href="/login">{$t('common.login')}</NavLi>
		{/if}
	</NavUl>
</Navbar>
