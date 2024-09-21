import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import common from '$lib/translations/en/common.json';
import CreateRiskFactorModal from './index.svelte';
import userEvent from '@testing-library/user-event';

describe('components/create-risk-factor-modal', () => {
	const riskCategories: { value: number; name: string }[] = [
		{ value: 1, name: 'Process' },
		{ value: 2, name: 'People' },
		{ value: 3, name: 'System' },
		{ value: 4, name: 'External' }
	];
	const owners: { value: string; name: string }[] = [
		{ value: '1', name: 'John Doe' },
		{ value: '2', name: 'Jane Doe' }
	];
	const entities: { value: string; name: string }[] = [{ value: '1', name: 'Company A' }];

	it('should render footer', () => {
		render(CreateRiskFactorModal, {
			props: {
				likelihoodOptions: [],
				impactOptions: [],
				responseOptions: [],
				isOpen: true,
				onSubmit: () => {},
				riskCategories,
				owners,
				entities
			}
		});
		expect(
			screen.getByText(common.components.createRiskFactorModal.secondaryButton)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.primaryButton)
		).toBeInTheDocument();
	});

	it('should render general information tab', () => {
		render(CreateRiskFactorModal, {
			props: {
				likelihoodOptions: [],
				impactOptions: [],
				responseOptions: [],
				isOpen: true,
				onSubmit: () => {},
				riskCategories,
				owners,
				entities
			}
		});

		expect(screen.getByText(common.components.createRiskFactorModal.heading)).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab1.heading)
		).toBeInTheDocument();
		expect(
			screen.getByLabelText(common.components.createRiskFactorModal.tab1.formFields.title)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(
				common.components.createRiskFactorModal.tab1.formFields.titlePlaceholder
			)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(
				common.components.createRiskFactorModal.tab1.formFields.titlePlaceholder
			)
		).toHaveAttribute('required');
		expect(
			screen.getByLabelText(common.components.createRiskFactorModal.tab1.formFields.description)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(
				common.components.createRiskFactorModal.tab1.formFields.descriptionPlaceholder
			)
		).toBeInTheDocument();
		expect(
			screen.getByLabelText(common.components.createRiskFactorModal.tab1.formFields.category)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab1.formFields.categoryPlaceholder)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab1.formFields.owners)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab1.formFields.ownersPlaceholder)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab1.formFields.entityPlaceholder)
		).toBeInTheDocument();
	});

	it('should render assessment tab', async () => {
		render(CreateRiskFactorModal, {
			props: {
				likelihoodOptions: [],
				impactOptions: [],
				responseOptions: [],
				isOpen: true,
				onSubmit: () => {},
				riskCategories,
				owners,
				entities
			}
		});
		const tab2 = screen.getByText(common.components.createRiskFactorModal.tab2.heading);

		await userEvent.click(tab2);

		expect(
			screen.getByLabelText(common.components.createRiskFactorModal.tab2.formFields.likelihood)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				common.components.createRiskFactorModal.tab2.formFields.likelihoodPlaceholder
			)
		).toBeInTheDocument();
		expect(
			screen.getByLabelText(common.components.createRiskFactorModal.tab2.formFields.impact)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab2.formFields.impactPlaceholder)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab2.formFields.inherentRisk)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab2.formFields.residualRisk)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab2.formFields.riskTolerance)
		).toBeInTheDocument();
		expect(
			screen.getByLabelText(common.components.createRiskFactorModal.tab2.formFields.response)
		).toBeInTheDocument();
		expect(
			screen.getByText(common.components.createRiskFactorModal.tab2.formFields.responsePlaceholder)
		).toBeInTheDocument();
		expect(
			screen.getByLabelText(common.components.createRiskFactorModal.tab2.formFields.notes)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(
				common.components.createRiskFactorModal.tab2.formFields.notesPlaceholder
			)
		).toBeInTheDocument();
	});

	it('should render monitoring tab', () => {
		render(CreateRiskFactorModal, {
			props: {
				likelihoodOptions: [],
				impactOptions: [],
				responseOptions: [],
				isOpen: true,
				onSubmit: () => {},
				riskCategories,
				owners,
				entities
			}
		});

		expect(
			screen.getByText(common.components.createRiskFactorModal.tab3.heading)
		).toBeInTheDocument();
	});
});
