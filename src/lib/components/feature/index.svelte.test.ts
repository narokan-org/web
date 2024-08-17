import { describe, it, expect } from 'vitest';
import Feature from './index.svelte';
import { screen, render } from '@testing-library/svelte';

describe('components/feature', () => {
	it('should render', () => {
		render(Feature, { key: '1', heading: 'my heading', subheading: ' my subheading' });

		expect(screen.getByTestId('feature-heading-1')).toHaveTextContent('my heading');
		expect(screen.getByTestId('feature-subheading-1')).toHaveTextContent('my subheading');
	});
});
