import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Card from './index.svelte';

describe('components/progress-card', () => {
	it('should render', () => {
		render(Card, {
			props: {
				heading: 'Mitigation plans in progress',
				inProgressItems: 2,
				totalItems: 4
			}
		});

		expect(screen.getByText('Mitigation plans in progress')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
	});
});
