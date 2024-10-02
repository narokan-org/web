import type { Locator, Page } from '@playwright/test';

export class HomePage {
	readonly page: Page;
	private readonly loginButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.loginButton = page.getByRole('link', { name: 'Log In' });
	}

	async login() {
		await this.loginButton.click();
	}
}
