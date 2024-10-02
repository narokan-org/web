import type { Locator, Page } from '@playwright/test';
import { SettingsSidebar } from '../../components/settings-sidebar';
import type { Workspace } from '../../mocks/workspace';

export class GeneralSettingsPage {
	readonly page: Page;
	readonly workspaceNameInput: Locator;
	private readonly workspaceSaveChangesButton: Locator;
	private readonly settingsSidebar: SettingsSidebar;

	constructor(page: Page) {
		this.page = page;
		this.settingsSidebar = new SettingsSidebar(page);
		this.workspaceNameInput = page.getByLabel('Workspace Name *');
		this.workspaceSaveChangesButton = page.getByRole('button', { name: 'Save Changes' });
	}

	async updateWorkspace({ workspace }: { workspace: Workspace }) {
		await this.settingsSidebar.generalWorkspaceLink.click();

		if (workspace.name) {
			await this.workspaceNameInput.fill(workspace.name);
		}

		await this.workspaceSaveChangesButton.click();
	}
}
