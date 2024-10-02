import type { Locator, Page } from '@playwright/test';

export class Sidebar {
	private page: Page;
	readonly settingsLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.settingsLink = page.getByRole('link', { name: 'Settings' });
	}
}
