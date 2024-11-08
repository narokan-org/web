import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { readable } from 'svelte/store';
import EditProfilePage from './+page.svelte';
import common from '$lib/translations/en/common.json';
import type { User } from '$lib/common/models/user';

describe('settings page', () => {
	describe('edit profile', () => {
		function renderPage(user?: Partial<User>) {
			return render(EditProfilePage, {
				context: new Map([['auth', { isLoggedIn: readable(false), user: readable(user ?? {}) }]])
			});
		}

		it('renders the edit profile page with correct heading', () => {
			renderPage();

			const heading = screen.getByRole('heading', { level: 4 });
			expect(heading).toHaveTextContent(common.pages.editProfile.heading);
		});
	});
});
