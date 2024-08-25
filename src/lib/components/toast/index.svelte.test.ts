import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Toast from './index.svelte';

describe('components/toast', () => {
	it('should render with close button', () => {
		render(Toast, {
			props: {
				dismissable: true
			}
		});

		expect(screen.getByText('Close')).toBeInTheDocument();
	});

	it('should render without close button', () => {
		render(Toast);

		expect(screen.queryByText('Close')).not.toBeInTheDocument();
	});

	it('should render with success icon', () => {
		render(Toast, {
			props: {
				icon: 'success'
			}
		});

		expect(screen.getByRole('img')).toBeInTheDocument();
	});

	it('should render an icon if none provided', () => {
		render(Toast);

		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});
