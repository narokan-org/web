import type { Page, Locator } from '@playwright/test';

export class LoginPage {
	readonly page: Page;
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly signInButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.emailInput = page.getByPlaceholder('Email Address');
		this.passwordInput = page.getByPlaceholder('Password');
		this.signInButton = page.getByRole('button', { name: 'Sign in' });
	}

	async login(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.signInButton.click();
	}
}
