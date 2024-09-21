import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import LoadingIndicator from './index.svelte';

describe('components/loading-indicator', () => {
	it('renders without a message', () => {
		render(LoadingIndicator);
		expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
	});

	it('renders with a message', () => {
		const testMessage = 'Loading test data...';
		render(LoadingIndicator, { props: { message: testMessage } });
		expect(screen.getByText(testMessage)).toBeInTheDocument();
	});
});
