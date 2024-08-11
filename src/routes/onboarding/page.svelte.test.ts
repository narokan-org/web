import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('onboarding page', () => {
	it('should render', () => {
		render(Page);

		const heading = screen.getByTestId('onboarding-heading');

		expect(heading).toBeInTheDocument();
	});
});
