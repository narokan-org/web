import type { Locator, Page } from '@playwright/test';

export class SettingsSidebar {
	private readonly page: Page;
	readonly generalWorkspaceLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.generalWorkspaceLink = page.getByRole('link', { name: 'General' });
	}
}
