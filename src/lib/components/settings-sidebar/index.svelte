<script lang="ts">
	import ArrowLeftOutline from 'flowbite-svelte-icons/ArrowLeftOutline.svelte';
	import { Sidebar, SidebarWrapper, SidebarGroup, SidebarItem } from 'flowbite-svelte';
	import { t } from '$lib/translations';
	import { onMount } from 'svelte';

	let originalUrl = '/';

	onMount(() => {
		originalUrl = document.referrer || '/';
	});

	export let activeUrl: string;

	const settingsItems = [
		{ label: $t('common.components.settingsSidebar.profile'), href: '/settings/edit-profile' },
		// {
		// 	label: $t('common.components.settingsSidebar.notifications'),
		// 	href: '/settings/notifications'
		// },
		{ label: $t('common.components.settingsSidebar.general'), href: '/settings/general' }
		// { label: $t('common.components.settingsSidebar.users'), href: '/settings/users' },
		// { label: $t('common.components.settingsSidebar.teams'), href: '/settings/teams' },
		// {
		// 	label: $t('common.components.settingsSidebar.securityAndPermissions'),
		// 	href: '/settings/security'
		// },
		// { label: $t('common.components.settingsSidebar.auditLog'), href: '/settings/audit-log' },
		// { label: $t('common.components.settingsSidebar.billing'), href: '/settings/billing' }
	];
</script>

<Sidebar {activeUrl} {...$$restProps}>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem href={originalUrl} class="text-2xl font-bold">
				<svelte:fragment slot="icon">
					<ArrowLeftOutline size="xl" />
				</svelte:fragment>
				<svelte:fragment slot="subtext">
					{$t('common.components.settingsSidebar.heading')}
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
		<SidebarGroup class="mt-8">
			<SidebarItem
				label={$t('common.components.settingsSidebar.section1Heading')}
				class="text-xl font-bold cursor-default hover:bg-transparent"
			/>
			{#each settingsItems.slice(0, 1) as item}
				<SidebarItem href={item.href} label={item.label} />
			{/each}
		</SidebarGroup>
		<SidebarGroup class="mt-10">
			<SidebarItem
				label={$t('common.components.settingsSidebar.section2Heading')}
				class="text-xl font-bold cursor-default hover:bg-transparent"
			/>
			{#each settingsItems.slice(1) as item}
				<SidebarItem href={item.href} label={item.label} />
			{/each}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
