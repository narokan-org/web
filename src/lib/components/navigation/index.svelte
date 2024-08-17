<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		Button,
		P,
		Sidebar,
		SidebarWrapper,
		SidebarBrand,
		SidebarItem,
		SidebarGroup,
		SidebarDropdownItem,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	import ChevronDownOutline from 'flowbite-svelte-icons/ChevronDownOutline.svelte';
	import HomeOutline from 'flowbite-svelte-icons/HomeOutline.svelte';
	import InboxOutline from 'flowbite-svelte-icons/InboxOutline.svelte';
	import ShieldCheckOutline from 'flowbite-svelte-icons/ShieldCheckOutline.svelte';
	import ShieldOutline from 'flowbite-svelte-icons/ShieldOutline.svelte';
	import BuildingOutline from 'flowbite-svelte-icons/BuildingOutline.svelte';
	import BookOutline from 'flowbite-svelte-icons/BookOutline.svelte';
	import CogOutline from 'flowbite-svelte-icons/CogOutline.svelte';

	import type { User } from '$lib/common/models/user';
	import { page } from '$app/stores';
	import { t } from '$lib/translations';

	const { isLoggedIn, user } = getContext<{ isLoggedIn: Readable<boolean>; user: Readable<User> }>(
		'auth'
	);

	let site = {
		name: 'Basel',
		href: '/',
		img: '/images/logo.png'
	};

	const onboardingPaths = ['/onboarding', '/invite'];

	let activeUrl: string;
	let isOnboardingPath: boolean;

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			activeUrl = $page.url.pathname;
			isOnboardingPath = onboardingPaths.includes($page.url.pathname);
		});
		return () => unsubscribe();
	});
</script>

<div class="flex">
	{#if !$isLoggedIn}
		<Navbar data-testid="navigation-top-bar">
			{#if !isOnboardingPath}
				<NavBrand data-testid="navigation-top-bar-logo" href="/">
					<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
						>{$t('common.appName')}</span
					>
				</NavBrand>
			{/if}

			<div class="flex md:order-2">
				<NavUl>
					<NavLi data-testid="navigation-top-bar-login" class="mr-4" href="/login"
						>{$t('common.components.navigation.login')}</NavLi
					>
				</NavUl>
				<Button data-testid="navigation-top-bar-signup" href="/signup"
					>{$t('common.components.navigation.signup')}</Button
				>
			</div>

			<NavUl {activeUrl} class="order-1">
				<NavLi data-testid="navigation-top-bar-features" class="cursor-pointer">
					{$t('common.components.navigation.features')}<ChevronDownOutline
						class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
					/>
				</NavLi>
				<NavLi data-testid="navigation-top-bar-solutions" class="cursor-pointer">
					{$t('common.components.navigation.solutions')}<ChevronDownOutline
						class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
					/>
				</NavLi>
				<NavLi data-testid="navigation-top-bar-pricing" href="/pricing"
					>{$t('common.components.navigation.pricing')}</NavLi
				>
			</NavUl>
		</Navbar>
	{:else if $isLoggedIn && isOnboardingPath}
		<div class="ml-auto mr-12 mt-12">
			<P data-testid="navigation-login-status" class="text-sm text-gray-500 block"
				>{$t('common.components.navigation.loginStatus')}</P
			>
			<P data-testid="navigation-login-status-user-email" class="text-sm block">{$user.email}</P>
		</div>
	{:else}
		<Sidebar data-testid="navigation-side-bar" {activeUrl}>
			<SidebarWrapper class="bg-white">
				<SidebarGroup>
					<SidebarBrand {site} />
					<SidebarItem label={$t('common.components.navigation.dashboard')} href="">
						<svelte:fragment slot="icon">
							<HomeOutline />
						</svelte:fragment>
					</SidebarItem>

					<SidebarItem label={$t('common.components.navigation.inbox')} href="/inbox">
						<svelte:fragment slot="icon">
							<InboxOutline />
						</svelte:fragment>
					</SidebarItem>

					<SidebarItem label={$t('common.components.navigation.trustCenter')} href="/trust-center">
						<svelte:fragment slot="icon">
							<ShieldCheckOutline />
						</svelte:fragment>
					</SidebarItem>

					<SidebarDropdownWrapper label={$t('common.components.navigation.risks')}>
						<svelte:fragment slot="icon">
							<ShieldOutline />
						</svelte:fragment>
						<SidebarDropdownItem
							label={$t('common.components.navigation.riskRegister')}
							href="/risk-register"
						/>
						<SidebarDropdownItem
							label={$t('common.components.navigation.assessments')}
							href="/assessments"
						/>
					</SidebarDropdownWrapper>

					<SidebarItem label={$t('common.components.navigation.controls')} href="/controls">
						<svelte:fragment slot="icon">
							<ShieldCheckOutline />
						</svelte:fragment>
					</SidebarItem>

					<SidebarDropdownWrapper label={$t('common.components.navigation.organization')}>
						<svelte:fragment slot="icon">
							<BuildingOutline />
						</svelte:fragment>
						<SidebarDropdownItem
							label={$t('common.components.navigation.processes')}
							href="/processes"
						/>
					</SidebarDropdownWrapper>
				</SidebarGroup>

				<SidebarGroup border>
					<SidebarDropdownWrapper label={$t('common.components.navigation.docs')}>
						<svelte:fragment slot="icon">
							<BookOutline />
						</svelte:fragment>
						<SidebarDropdownItem
							label={$t('common.components.navigation.policies')}
							href="/policies"
						/>
					</SidebarDropdownWrapper>

					<SidebarItem label={$t('common.components.navigation.settings')} href="/settings">
						<svelte:fragment slot="icon">
							<CogOutline />
						</svelte:fragment>
					</SidebarItem>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	{/if}
</div>
