import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('entities page', () => {
	it('should render', () => {
		render(Page);

		const heading = screen.getByTestId('entities-heading');

		expect(heading).toBeInTheDocument();
	});
});
