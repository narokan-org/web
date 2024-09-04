import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	const currentCompany: string | undefined = cookies.get('narokan-current-company');

	if (!currentCompany) {
		locals.loggingService.error('No current company found in cookies');
		return fail(400);
	}

	const categories = await locals.companyService.getRiskCategories(Number(currentCompany));

	return { categories };
};
