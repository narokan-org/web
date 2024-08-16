import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Page from './+page.svelte';
import common from '$lib/translations/en/common.json';

describe('invite page', () => {
	it('should render', async () => {
		render(Page);

		expect(screen.getByTestId('invite-heading')).toHaveTextContent(common.pages.invite.heading);
		expect(screen.getByTestId('invite-subheading')).toHaveTextContent(
			common.pages.invite.subheading
		);
		expect(
			screen.getAllByRole('textbox').filter((input) => (input as HTMLInputElement).type === 'email')
		).toHaveLength(3);
		expect(screen.getByTestId('invite-send-button')).toHaveTextContent(
			common.pages.invite.sendButtonLabel
		);
		expect(screen.getByTestId('invite-add-button')).toHaveTextContent(
			common.pages.invite.addAnotherButtonLabel
		);
		expect(screen.getByTestId('invite-skip-button')).toHaveTextContent(
			common.pages.invite.skipButtonLabel
		);
		expect(screen.getByTestId('invite-copy-button')).toHaveTextContent(
			common.pages.invite.copyInviteLabel
		);
	});

	it('should add another email input when add button is clicked', async () => {
		render(Page);

		const addAnotherButton = screen.getByTestId('invite-add-button');
		await userEvent.click(addAnotherButton);

		expect(
			screen.getAllByRole('textbox').filter((input) => (input as HTMLInputElement).type === 'email')
		).toHaveLength(4);
	});

	it('should add a 5th email input when add button is clicked twice', async () => {
		render(Page);

		const addAnotherButton = screen.getByTestId('invite-add-button');

		await userEvent.click(addAnotherButton);
		await userEvent.click(addAnotherButton);

		expect(
			screen.getAllByRole('textbox').filter((input) => (input as HTMLInputElement).type === 'email')
		).toHaveLength(5);
	});

	it('should hide the add button when 5 email inputs are present', async () => {
		render(Page);

		const addAnotherButton = screen.getByTestId('invite-add-button');

		await userEvent.click(addAnotherButton);
		await userEvent.click(addAnotherButton);

		expect(addAnotherButton).not.toBeInTheDocument();
	});

	it('should go to the /dashboard route when skip button is clicked', async () => {
		render(Page);

		const skipButton = screen.getByTestId('invite-skip-button');
		expect(skipButton).toHaveAttribute('href', '/dashboard');
	});
});
