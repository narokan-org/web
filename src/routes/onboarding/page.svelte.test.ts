import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Page from './+page.svelte';

describe('onboarding page', () => {
	it('should render', () => {
		render(Page);

		expect(screen.getByTestId('onboarding-heading')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-subheading')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-workspace-name-label')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-workspace-name-input')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-workspace-location-label')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-workspace-location-input')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-team-size-label')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-team-size-input')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-role-label')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-role-input')).toBeInTheDocument();
		expect(screen.getByTestId('onboarding-submit-button')).toBeInTheDocument();
	});

	it('should not allow more than 16 characters for workspace name', async () => {
		render(Page);

		const workspaceNameInput = screen.getByTestId<HTMLInputElement>(
			'onboarding-workspace-name-input'
		);
		await userEvent.type(workspaceNameInput, 'ThisIsMoreThan16Chars');

		expect(workspaceNameInput.value).toHaveLength(16);
	});

	it('should have roles in sorted order', async () => {
		render(Page);

		const roleInput = screen.getByTestId<HTMLSelectElement>('onboarding-role-input');
		const options = Array.from(roleInput.options).map((option) => option.value);

		expect(options).toEqual([
			'',
			'analyst',
			'c-level',
			'director',
			'manager',
			'specialist',
			'stakeholder',
			'other'
		]);
	});
});
