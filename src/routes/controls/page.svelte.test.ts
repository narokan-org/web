import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('controls page', () => {
	it('should render', () => {
		render(Page);

		const heading = screen.getByTestId('controls-heading');

		expect(heading).toBeInTheDocument();
	});
});
