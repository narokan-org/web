import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { HomePage } from './pages/home-page';
import { GeneralSettingsPage } from './pages/settings/general-page';
import { Sidebar } from './components/sidebar';
import { Workspace } from './mocks/workspace';

test.describe('settings', () => {
	let loginPage: LoginPage;
	let homePage: HomePage;
	let sidebar: Sidebar;
	let settingsPage: GeneralSettingsPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		homePage = new HomePage(page);
		sidebar = new Sidebar(page);
		settingsPage = new GeneralSettingsPage(page);

		await page.goto('/');
	});

	test('it should allow updating workspace', async () => {
		const workspace = new Workspace();

		await homePage.login();

		await loginPage.login(process.env.E2E_EMAIL!, process.env.E2E_PASSWORD!);

		await sidebar.settingsLink.click();

		await settingsPage.updateWorkspace({ workspace });

		await expect(settingsPage.page.getByText('Changes saved successfully.')).toBeVisible();
	});
});
