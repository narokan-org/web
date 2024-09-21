import { fail, type Cookies } from '@sveltejs/kit';
import type { RiskCategory } from '$lib/common/models/risk-category';
import type { User } from '$lib/common/models/user';
import type { LikelihoodOption } from '$lib/common/models/likelihood-option';
import type { ImpactOption } from '$lib/common/models/impact-option';
import type { ResponseOption } from '$lib/common/models/response-option';
import type { Company } from '$lib/common/models/company';

export interface CreateRiskModalData {
	categories: RiskCategory[];
	owners: User[];
	likelihoodOptions: LikelihoodOption[];
	impactOptions: ImpactOption[];
	responseOptions: ResponseOption[];
	entities: Company[];
	currentEntity: Company;
	currentUser: User;
}

export async function loadCreateRiskModal({
	locals,
	cookies
}: {
	locals: App.Locals;
	cookies: Cookies;
}) {
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
					id: u.id
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
}
