import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions = {
	'create-risk': async ({ locals, cookies, request }) => {
		const data = await request.formData();

		const formData = {
			title: data.get('title')?.toString(),
			description: data.get('description')?.toString(),
			category: data.get('category')?.toString(),
			owners: data.getAll('owners'),
			entities: data.getAll('entities'),
			likelihood: data.get('likelihood')?.toString(),
			impact: data.get('impact')?.toString(),
			response: data.get('response')?.toString(),
			notes: data.get('notes')?.toString()
		};

		if (
			!formData.title ||
			!formData.category ||
			formData.owners.length === 0 ||
			formData.entities.length === 0 ||
			!formData.likelihood ||
			!formData.impact ||
			!formData.response
		) {
			return fail(400, { message: 'Missing required fields' });
		}

		const newRisk = await locals.riskService.createRisk({
			title: formData.title,
			description: formData.description,
			categoryRiskId: Number(formData.category),
			companyId: Number(formData.entities[0])
		});

		if (!newRisk) {
			return fail(500, { message: 'Failed to create risk' });
		}

		const newAssessment = await locals.assessmentService.createAssessment({
			riskId: newRisk.id,
			assessment: {
				likelihoodOptionId: Number(formData.likelihood),
				impactOptionId: Number(formData.impact),
				responseOptionId: Number(formData.response),
				notes: formData.notes
			}
		});

		if (!newAssessment) {
			return fail(500, { message: 'Failed to create assessment' });
		}

		return {
			success: true
		};
	}
};

export const load: PageServerLoad = async ({ locals, cookies }) => {
	const currentCompany: string | undefined = cookies.get('narokan-current-company');

	if (!currentCompany) {
		locals.loggingService.error('No current company found in cookies');
		return fail(400);
	}

	const categories = await locals.companyService.getRiskCategories(Number(currentCompany));
	const likelihoodOptions = await locals.assessmentService.getLikelihoodOptions();
	const impactOptions = await locals.assessmentService.getImpactOptions();
	const responseOptions = await locals.assessmentService.getResponseOptions();
	const companyUsers = await locals.companyService.getUserCompanyRelationships({
		CompanyId: parseInt(currentCompany)
	});
	const currentUser = await locals.userService.getUser();
	const entities = await locals.companyService.getCompanies();
	const currentEntity = entities.find((e) => e.id === Number(currentCompany));

	const owners =
		(await locals.identityService.getUsers(companyUsers.map((u) => u.userId)))
			.filter((u) => u.email && u.name)
			.map((u) => {
				return {
					name: `${u.name} (${u.email})`,
					userId: u.id
				};
			}) ?? [];

	return {
		categories,
		owners,
		likelihoodOptions,
		impactOptions,
		responseOptions,
		entities,
		currentEntity,
		currentUser
	};
};
