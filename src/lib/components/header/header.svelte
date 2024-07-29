<script>
	import { page } from '$app/stores';
	import { t, locale } from '$lib/translations';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	$: activeUrl = $page.url.pathname;
	console.log(`currenLocale is ${$locale}`);
</script>

<Navbar>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>{$t('common.appName')}</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/login">{$t('common.login')}</NavLi>
	</NavUl>
</Navbar>
