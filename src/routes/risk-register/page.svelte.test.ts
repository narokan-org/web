import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import common from '$lib/translations/en/common.json';
import Page from './+page.svelte';

describe('risk register page', () => {
	it('should render', () => {
		render(Page);

		expect(screen.getByText(common.pages.riskRegister.heading)).toBeInTheDocument();
		expect(
			screen.getByText(common.pages.riskRegister.mitigationPlansCard.heading)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.pages.riskRegister.residualRiskTrendCard.footer)
		).toBeInTheDocument();
		expect(screen.getByText(common.pages.riskRegister.table.heading1)).toBeInTheDocument();
		expect(screen.getByText(common.pages.riskRegister.table.heading2)).toBeInTheDocument();
		expect(screen.getByText(common.pages.riskRegister.table.heading3)).toBeInTheDocument();
		expect(screen.getByText(common.pages.riskRegister.table.heading4)).toBeInTheDocument();
		expect(screen.getByText(common.pages.riskRegister.table.heading5)).toBeInTheDocument();
		expect(screen.getByText(common.pages.riskRegister.table.heading6)).toBeInTheDocument();
		expect(screen.getByText(common.pages.riskRegister.table.primaryButton)).toBeInTheDocument();
		expect(screen.getByText(common.pages.riskRegister.table.secondaryButton)).toBeInTheDocument();
		expect(screen.getByText(common.pages.riskRegister.table.searchPlaceholder)).toBeInTheDocument();
	});
});
