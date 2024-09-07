import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Navigation from './index.svelte';
import { readable } from 'svelte/store';
import * as stores from '$app/stores';
import { createMockPage } from '../../../../vitest-setup';
import common from '$lib/translations/en/common.json';
import type { User } from '$lib/common/models/user';
import { faker } from '@faker-js/faker';

describe('components/navigation', () => {
	it('should render navigation when not logged in', () => {
		const mockPage = createMockPage({
			url: new URL('http://localhost/')
		});

		vi.mocked(stores.page).subscribe = vi.fn((fn) => {
			fn(mockPage);
			return readable(mockPage).subscribe(fn);
		});

		render(Navigation, {
			context: new Map([['auth', { isLoggedIn: readable(false), user: readable({}) }]])
		});

		expect(screen.getByTestId('navigation-top-bar')).toBeInTheDocument();
		expect(screen.getByTestId('navigation-top-bar-logo')).toHaveTextContent(common.appName);
		expect(screen.getByTestId('navigation-top-bar-login')).toHaveTextContent(
			common.components.navigation.login
		);
		expect(screen.getByTestId('navigation-top-bar-signup')).toHaveTextContent(
			common.components.navigation.signup
		);
		expect(screen.getByTestId('navigation-top-bar-features')).toBeInTheDocument();
		expect(screen.getByTestId('navigation-top-bar-pricing')).toBeInTheDocument();
		expect(screen.getByTestId('navigation-top-bar-solutions')).toBeInTheDocument();
	});

	it('should render login status on invite page', () => {
		const mockPage = createMockPage({
			url: new URL('http://localhost/invite')
		});

		vi.mocked(stores.page).subscribe = vi.fn((fn) => {
			fn(mockPage);
			return readable(mockPage).subscribe(fn);
		});
		const testUser = { email: 'nitish.sachar@gmail.com' };

		render(Navigation, {
			context: new Map([['auth', { isLoggedIn: readable(true), user: readable(testUser) }]])
		});

		expect(screen.getByTestId('navigation-login-status')).toHaveTextContent(
			common.components.navigation.loginStatus
		);
		expect(screen.getByTestId('navigation-login-status-user-email')).toHaveTextContent(
			testUser.email
		);
	});

	it('should render login status on onboarding page', () => {
		const mockPage = createMockPage({
			url: new URL('http://localhost/onboarding')
		});

		vi.mocked(stores.page).subscribe = vi.fn((fn) => {
			fn(mockPage);
			return readable(mockPage).subscribe(fn);
		});
		const testUser = { email: 'nitish.sachar@gmail.com' };

		render(Navigation, {
			context: new Map([['auth', { isLoggedIn: readable(true), user: readable(testUser) }]])
		});

		expect(screen.getByTestId('navigation-login-status')).toHaveTextContent(
			common.components.navigation.loginStatus
		);
		expect(screen.getByTestId('navigation-login-status-user-email')).toHaveTextContent(
			testUser.email
		);
	});

	it('should render side menu if logged in and not on onboarding paths', () => {
		const mockPage = createMockPage({
			url: new URL('http://localhost/')
		});

		vi.mocked(stores.page).subscribe = vi.fn((fn) => {
			fn(mockPage);
			return readable(mockPage).subscribe(fn);
		});
		const testUser: Partial<User> = {
			name: faker.person.fullName(),
			email: faker.internet.email()
		};

		render(Navigation, {
			context: new Map([['auth', { isLoggedIn: readable(true), user: readable(testUser) }]])
		});

		expect(screen.getByTestId('navigation-side-bar')).toBeInTheDocument();
		expect(screen.getByTestId('navigation-side-bar-branding')).toBeInTheDocument();
		expect(screen.getByTestId('navigation-side-bar-dashboard')).toHaveTextContent(
			common.components.navigation.dashboard
		);
		expect(screen.getByTestId('navigation-side-bar-dashboard')).toHaveAttribute('href', '/');
		expect(screen.getByTestId('navigation-side-bar-inbox')).toHaveTextContent(
			common.components.navigation.inbox
		);
		expect(screen.getByTestId('navigation-side-bar-inbox')).toHaveAttribute('href', '/inbox');
		expect(screen.getByTestId('navigation-side-bar-trust-center')).toHaveTextContent(
			common.components.navigation.trustCenter
		);
		expect(screen.getByTestId('navigation-side-bar-trust-center')).toHaveAttribute(
			'href',
			'/trust-center'
		);
		expect(screen.getByTestId('navigation-side-bar-trust-center')).toBeInTheDocument();
		expect(screen.getByTestId('navigation-side-bar-controls')).toHaveTextContent(
			common.components.navigation.controls
		);
		expect(screen.getByTestId('navigation-side-bar-organization')).toHaveTextContent(
			common.components.navigation.organization
		);
		expect(screen.getByTestId('navigation-side-bar-docs')).toHaveTextContent(
			common.components.navigation.docs
		);
		expect(screen.getByTestId('navigation-side-bar-settings')).toHaveTextContent(
			common.components.navigation.settings
		);
		expect(screen.getByTestId('navigation-avatar')).toHaveTextContent(testUser.name![0]);
		expect(screen.getByText(testUser.name!)).toBeInTheDocument();
		expect(screen.getByText(testUser.email!)).toBeInTheDocument();
	});
});
