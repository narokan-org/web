import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('risks page', () => {
	it('should render', () => {
		render(Page);

		const heading = screen.getByTestId('risks-heading');

		expect(heading).toBeInTheDocument();
	});
});
