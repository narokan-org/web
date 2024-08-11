import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('assessments page', () => {
	it('should render', () => {
		render(Page);

		const heading = screen.getByTestId('assessments-heading');

		expect(heading).toBeInTheDocument();
	});
});
