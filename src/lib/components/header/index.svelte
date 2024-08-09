<script>
	import { page } from '$app/stores';
	import { t } from '$lib/translations';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
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
	{#if !isLoggedIn}
		<div class="flex md:order-2">
			<NavUl>
				<NavLi class="mr-4" href="/login">{$t('common.components.header.login')}</NavLi>
			</NavUl>
			<Button href="/signup">{$t('common.components.header.signup')}</Button>
		</div>
	{/if}
	<NavUl {activeUrl} class="order-1">
		{#if isLoggedIn}
			<NavLi href="/dashboard">{$t('common.components.header.dashboard')}</NavLi>
			<NavLi href="/risks">{$t('common.components.header.risks')}</NavLi>
			<NavLi href="/controls">{$t('common.components.header.controls')}</NavLi>
			<NavLi href="/assessments">{$t('common.components.header.assessments')}</NavLi>
			<NavLi href="/entities">{$t('common.components.header.entities')}</NavLi>
			<NavLi href="/settings">{$t('common.components.header.settings')}</NavLi>
			<NavLi href="/logout">{$t('common.components.header.logout')}</NavLi>
		{:else}
			<NavLi href="/pricing">{$t('common.components.header.pricing')}</NavLi>
		{/if}
	</NavUl>
</Navbar>
