import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import common from '$lib/translations/en/common.json';
import Page from './+page.svelte';

describe('settings page', () => {
	describe('general settings', () => {
		it('renders the general settings page with correct heading', () => {
			render(Page, {
				props: {
					data: {
						company: {
							name: 'My Workspace',
							id: 1,
							regionId: 1
						}
					}
				}
			});

			expect(screen.getByText(common.pages.generalSettings.heading)).toBeInTheDocument();
			expect(
				screen.getByText(common.components.generalSettings.manageWorkspace)
			).toBeInTheDocument();
		});
	});
});
