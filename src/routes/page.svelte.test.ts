import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Page from './+page.svelte';
import common from '../lib/translations/en/common.json';

global.fetch = vi.fn(() =>
	Promise.resolve(
		new Response(JSON.stringify({ uuid: '12345' }), {
			status: 200,
			headers: {
				'Content-type': 'application/json'
			}
		})
	)
);

describe('home page', () => {
	it('should render', () => {
		render(Page);

		expect(screen.getByTestId('home-heading')).toHaveTextContent(common.pages.home.heading);
		expect(screen.getByTestId('home-subheading')).toHaveTextContent(common.pages.home.subheading);
		expect(screen.getByTestId('home-waitlist-input')).toBeInTheDocument();
		expect(screen.getByTestId('home-waitlist-button')).toHaveTextContent(
			common.pages.home.waitlistButton
		);
		expect(screen.getByTestId('home-hero-image')).toBeInTheDocument();
		expect(screen.getByTestId('feature-heading-1')).toHaveTextContent(
			common.pages.home.feature1Heading
		);
		expect(screen.getByTestId('feature-subheading-1')).toHaveTextContent(
			common.pages.home.feature1Subheading
		);
		expect(screen.getByTestId('feature-heading-2')).toHaveTextContent(
			common.pages.home.feature2Heading
		);
		expect(screen.getByTestId('feature-subheading-2')).toHaveTextContent(
			common.pages.home.feature2Subheading
		);
		expect(screen.getByTestId('feature-heading-3')).toHaveTextContent(
			common.pages.home.feature3Heading
		);
		expect(screen.getByTestId('feature-subheading-3')).toHaveTextContent(
			common.pages.home.feature3Subheading
		);
	});

	it('handles form submission', async () => {
		render(Page);

		const emailInput = screen.getByTestId('home-waitlist-input');
		const submitButton = screen.getByTestId('home-waitlist-button');

		const email = 'test@example.com';
		await userEvent.type(emailInput, email);
		await userEvent.click(submitButton);

		expect(global.fetch).toHaveBeenCalledWith('https://api.getwaitlist.com/api/v1/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				waitlist_id: '19478'
			})
		});
		expect(emailInput).toHaveValue('');
	});
});
