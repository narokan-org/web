import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import HomePage from './+page.svelte';
import common from '../lib/translations/en/common.json';
import { readable, writable } from 'svelte/store';
import { createMockUser } from '../../vitest-setup';

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
		render(HomePage, {
			context: new Map([['auth', { isLoggedIn: readable(false), user: readable(null) }]])
		});

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
		render(HomePage, {
			context: new Map([['auth', { isLoggedIn: writable(false), user: writable(null) }]])
		});

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

	describe('loggedIn', () => {
		it('should render', () => {
			const testUser = createMockUser();

			render(HomePage, {
				context: new Map([['auth', { isLoggedIn: readable(true), user: readable(testUser) }]])
			});

			expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
				`Welcome, ${testUser.name}`
			);
			expect(screen.getByText(common.pages.home.loggedIn.subheading)).toBeInTheDocument();
		});

		it('should render with default heading when user does not have a name', () => {
			const testUser = createMockUser({
				name: ''
			});

			render(HomePage, {
				context: new Map([['auth', { isLoggedIn: readable(true), user: readable(testUser) }]])
			});

			expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
				common.pages.home.loggedIn.defaultHeading
			);
		});

		it('should render with progress cards', () => {
			const testUser = createMockUser();

			render(HomePage, {
				context: new Map([['auth', { isLoggedIn: readable(true), user: readable(testUser) }]])
			});

			expect(screen.getByText(common.pages.home.loggedIn.progressCard1Heading)).toBeInTheDocument();
			expect(screen.getByText(common.pages.home.loggedIn.progressCard2Heading)).toBeInTheDocument();
			expect(screen.getByText(common.pages.home.loggedIn.progressCard3Heading)).toBeInTheDocument();
		});

		it('should render tables', () => {
			const testUser = createMockUser();

			render(HomePage, {
				context: new Map([['auth', { isLoggedIn: readable(true), user: readable(testUser) }]])
			});

			expect(screen.getByText(common.pages.home.loggedIn.risksTable.heading)).toBeInTheDocument();
			expect(screen.getByText(common.pages.home.loggedIn.risksTable.column1)).toBeInTheDocument();
			expect(screen.getAllByText(common.pages.home.loggedIn.risksTable.column2)).toHaveLength(2);
			expect(screen.getAllByText(common.pages.home.loggedIn.risksTable.column3)).toHaveLength(2);
			expect(screen.getAllByText(common.pages.home.loggedIn.risksTable.column4)).toHaveLength(2);
			expect(screen.getByText(common.pages.home.loggedIn.createRiskButton)).toBeInTheDocument();
			expect(screen.getAllByText(common.pages.home.loggedIn.bulkUploadButton)).toHaveLength(2);
		});
	});
});
