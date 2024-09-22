<script lang="ts">
	import { getContext } from 'svelte';
	import { readable, type Readable } from 'svelte/store';
	import {
		Avatar,
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
	import {
		ChevronDownOutline,
		HomeOutline,
		InboxOutline,
		ShieldCheckOutline,
		ShieldOutline,
		BuildingOutline,
		BookOutline,
		CogOutline
	} from 'flowbite-svelte-icons';
	import UserPopover from '$lib/components/user-popover/index.svelte';
	import SettingsSidebar from '$lib/components/settings-sidebar/index.svelte';

	import type { User } from '$lib/common/models/user';
	import { page } from '$app/stores';
	import { t } from '$lib/translations';
	import { isOnboardingPath } from '$lib/utils/utils';

	const { isLoggedIn, user } = getContext<{ isLoggedIn: Readable<boolean>; user: Readable<User> }>(
		'auth'
	) ?? { isLoggedIn: readable(false), user: readable(null) };

	let site = {
		name: 'Narokan',
		href: '/',
		img: '/images/logo.png'
	};

	$: activeUrl = $page.url.pathname;
	$: isSettingsPage = activeUrl.startsWith('/settings');
</script>

<div class="flex" {...$$restProps}>
	{#if !$isLoggedIn}
		<Navbar data-testid="navigation-top-bar">
			<NavBrand data-testid="navigation-top-bar-logo" href="/">
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
					>{$t('common.appName')}</span
				>
			</NavBrand>

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
	{:else if $isLoggedIn && isOnboardingPath(activeUrl)}
		<div class="mt-12 mr-12">
			<P data-testid="navigation-login-status" class="text-sm text-gray-500 text-right"
				>{$t('common.components.navigation.loginStatus')}</P
			>
			<P data-testid="navigation-login-status-user-email" class="text-sm text-right"
				>{$user.email}</P
			>
		</div>
	{:else if $isLoggedIn && isSettingsPage}
		<SettingsSidebar {activeUrl} data-testid="navigation-settings-sidebar" />
	{:else}
		<Sidebar class="h-full" data-testid="navigation-side-bar" {activeUrl}>
			<SidebarWrapper class="bg-white h-full flex flex-col">
				<SidebarGroup>
					<SidebarBrand data-testid="navigation-side-bar-branding" {site} />
					<SidebarItem
						data-testid="navigation-side-bar-dashboard"
						label={$t('common.components.navigation.dashboard')}
						href="/"
						active={activeUrl === '/' || activeUrl === ''}
					>
						<svelte:fragment slot="icon">
							<HomeOutline />
						</svelte:fragment>
					</SidebarItem>

					<SidebarItem
						data-testid="navigation-side-bar-inbox"
						label={$t('common.components.navigation.inbox')}
						href="/inbox"
					>
						<svelte:fragment slot="icon">
							<InboxOutline />
						</svelte:fragment>
					</SidebarItem>

					<SidebarItem
						data-testid="navigation-side-bar-trust-center"
						label={$t('common.components.navigation.trustCenter')}
						href="/trust-center"
					>
						<svelte:fragment slot="icon">
							<ShieldCheckOutline />
						</svelte:fragment>
					</SidebarItem>

					<SidebarDropdownWrapper
						data-testid="navigation-side-bar-risks"
						label={$t('common.components.navigation.risks')}
						isOpen={activeUrl === '/risk-register' || activeUrl === '/assessments'}
					>
						<svelte:fragment slot="icon">
							<ShieldOutline />
						</svelte:fragment>
						<SidebarDropdownItem
							data-testid="navigation-side-bar-risk-register"
							label={$t('common.components.navigation.riskRegister')}
							href="/risk-register"
							active={activeUrl === '/risk-register'}
						/>
						<SidebarDropdownItem
							data-testid="navigation-side-bar-assessments"
							label={$t('common.components.navigation.assessments')}
							href="/assessments"
							active={activeUrl === '/assessments'}
						/>
					</SidebarDropdownWrapper>

					<SidebarItem
						data-testid="navigation-side-bar-controls"
						label={$t('common.components.navigation.controls')}
						href="/controls"
					>
						<svelte:fragment slot="icon">
							<ShieldCheckOutline />
						</svelte:fragment>
					</SidebarItem>

					<SidebarDropdownWrapper
						data-testid="navigation-side-bar-organization"
						label={$t('common.components.navigation.organization')}
					>
						<svelte:fragment slot="icon">
							<BuildingOutline />
						</svelte:fragment>
						<SidebarDropdownItem
							data-testid="navigation-side-bar-processes"
							label={$t('common.components.navigation.processes')}
							href="/processes"
						/>
					</SidebarDropdownWrapper>
				</SidebarGroup>

				<SidebarGroup border>
					<SidebarDropdownWrapper
						data-testid="navigation-side-bar-docs"
						label={$t('common.components.navigation.docs')}
					>
						<svelte:fragment slot="icon">
							<BookOutline />
						</svelte:fragment>
						<SidebarDropdownItem
							data-testid="navigation-side-bar-policies"
							label={$t('common.components.navigation.policies')}
							href="/policies"
						/>
					</SidebarDropdownWrapper>

					<SidebarItem
						data-testid="navigation-side-bar-settings"
						label={$t('common.components.navigation.settings')}
						href="/settings/edit-profile"
					>
						<svelte:fragment slot="icon">
							<CogOutline />
						</svelte:fragment>
					</SidebarItem>
				</SidebarGroup>

				<div class="flex-grow"></div>

				<SidebarGroup border />

				<!-- TODO: This is not a11y compliant. -->
				<div class="flex flex-row" id="navigation-user-info" data-testid="navigation-user-info">
					<Avatar data-testid="navigation-avatar" rounded>
						{#if $user.name}
							{$user.name.charAt(0)}
						{/if}
					</Avatar>
					<div class="flex flex-col ml-4">
						<P class="text-sm">{$user.name}</P>
						<P class="text-xs text-gray-500">{$user.email}</P>
					</div>
				</div>
				<UserPopover triggeredBy="#navigation-user-info" />
			</SidebarWrapper>
		</Sidebar>
	{/if}
</div>
