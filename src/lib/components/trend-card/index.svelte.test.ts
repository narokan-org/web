import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import TrendCard from './index.svelte';

describe('components/trend-card', () => {
	it('should render', () => {
		render(TrendCard, {
			props: {
				label: 'Low',
				count: 40,
				percentage: 10,
				footer: 'Residual Risk Trend'
			}
		});

		expect(screen.getByText('Residual Risk Trend')).toBeInTheDocument();
		expect(screen.getByText('40')).toBeInTheDocument();
		expect(screen.getByText('10%')).toBeInTheDocument();
		expect(screen.getByText('Low')).toBeInTheDocument();
	});

	it('should render with medium label', () => {
		render(TrendCard, {
			props: {
				label: 'Medium',
				count: 40,
				percentage: 10,
				footer: 'Residual Risk Trend'
			}
		});

		expect(screen.getByText('Medium')).toBeInTheDocument();
	});

	it('should render with high label', () => {
		render(TrendCard, {
			props: {
				label: 'High',
				count: 40,
				percentage: 10,
				footer: 'Residual Risk Trend'
			}
		});

		expect(screen.getByText('High')).toBeInTheDocument();
	});

	it('should render with up arrow', () => {
		render(TrendCard, {
			props: {
				label: 'Low',
				count: 40,
				percentage: 10,
				footer: 'Residual Risk Trend'
			}
		});

		expect(screen.getByRole('img', { name: 'arrow up outline' })).toBeInTheDocument();
	});

	it('should render with down arrow', () => {
		render(TrendCard, {
			props: {
				label: 'Low',
				count: 40,
				percentage: -10,
				footer: 'Residual Risk Trend'
			}
		});

		expect(screen.getByRole('img', { name: 'arrow down outline' })).toBeInTheDocument();
	});

	it('should render with no arrow', () => {
		render(TrendCard, {
			props: {
				label: 'Low',
				count: 40,
				percentage: 0,
				footer: 'Residual Risk Trend'
			}
		});

		expect(screen.queryByRole('img')).not.toBeInTheDocument();
	});
});
