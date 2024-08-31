import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import common from '$lib/translations/en/common.json';
import Page from './+page.svelte';

describe('risks page', () => {
	it('should render', () => {
		render(Page);

		expect(screen.getByText(common.pages.riskRegister.heading)).toBeInTheDocument();
		expect(
			screen.getByText(common.pages.riskRegister.mitigationPlansCard.heading)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.pages.riskRegister.residualRiskTrendCard.footer)
		).toBeInTheDocument();
	});
});
