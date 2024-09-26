import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import common from '$lib/translations/en/common.json';
import Index from './index.svelte';

describe('components/general-settings', () => {
	it('renders', () => {
		render(Index);

		expect(screen.getByText(common.components.generalSettings.manageWorkspace)).toBeInTheDocument();
		expect(screen.getByText(common.components.generalSettings.saveButton)).toBeInTheDocument();
		expect(
			screen.getByText(common.components.generalSettings.formFields.workspaceName)
		).toBeInTheDocument();
	});
});
