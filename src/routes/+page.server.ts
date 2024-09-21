import { createRisk } from '$lib/actions/create-risk';
import { loadCreateRiskModal } from '$lib/data-loaders/create-risk-modal';
import type { PageServerLoad } from './$types';

export const actions = {
	'create-risk': createRisk
};

export const load: PageServerLoad = async ({ locals, cookies }) => {
	const user = await locals.userService.getUser();

	if (!user) {
		return;
	}

	const currentCompanyCookie = cookies.get('narokan-current-company');

	if (!currentCompanyCookie) {
		const userCompanies = await locals.companyService.getUserCompanyRelationships({
			UserId: user.id
		});

		if (userCompanies && userCompanies.length > 0) {
			const firstCompany = userCompanies[0];

			cookies.set('narokan-current-company', firstCompany.companyId.toString(), {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 30
			});
		}
	}

	const data = {
		createRiskModal: await loadCreateRiskModal({ locals, cookies })
	};
	return data;
};
