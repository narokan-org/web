import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	const currentCompany: string | undefined = cookies.get('narokan-current-company');

	if (!currentCompany) {
		locals.loggingService.error('No current company found in cookies');
		return fail(400);
	}

	const categories = await locals.companyService.getRiskCategories(Number(currentCompany));

	const companyUsers = await locals.companyService.getUserCompanyRelationships(
		Number(currentCompany)
	);

	const owners =
		(await locals.identityService.getUsers(companyUsers.map((u) => u.userId)))
			.filter((u) => u.email && u.name)
			.map((u) => {
				return {
					name: `${u.name} (${u.email})`,
					userId: u.id
				};
			}) ?? [];

	console.log('owners', owners);
	return { categories, owners };
};
