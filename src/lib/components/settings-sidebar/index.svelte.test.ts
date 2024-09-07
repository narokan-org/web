import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import SettingsSidebar from './index.svelte';
import common from '$lib/translations/en/common.json';

describe('SettingsSidebar', () => {
	it('renders', () => {
		render(SettingsSidebar);

		expect(screen.getByText(common.components.settingsSidebar.section1Heading)).toBeInTheDocument();
		expect(screen.getByText(common.components.settingsSidebar.section2Heading)).toBeInTheDocument();
		expect(screen.getByText(common.components.settingsSidebar.profile)).toBeInTheDocument();
		expect(screen.getByText(common.components.settingsSidebar.notifications)).toBeInTheDocument();

		expect(screen.getByText(common.components.settingsSidebar.general)).toBeInTheDocument();
		expect(screen.getByText(common.components.settingsSidebar.users)).toBeInTheDocument();
		expect(screen.getByText(common.components.settingsSidebar.teams)).toBeInTheDocument();
		expect(
			screen.getByText(common.components.settingsSidebar.securityAndPermissions)
		).toBeInTheDocument();
		expect(screen.getByText(common.components.settingsSidebar.auditLog)).toBeInTheDocument();
		expect(screen.getByText(common.components.settingsSidebar.billing)).toBeInTheDocument();
	});
});
