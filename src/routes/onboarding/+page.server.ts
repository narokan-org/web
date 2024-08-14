import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();
		const companyName = formData.get('workspace-name') as string;

		if (!companyName.trim()) {
			throw fail(400, {
				message: 'Company name is required'
			});
		}

		const newCompany = await locals.companyService.createCompany({ name: companyName });

		if (!newCompany) {
			throw fail(500, { message: 'Failed to create company' });
		}

		return {
			status: 200,
			body: JSON.stringify(newCompany)
		};
	}
};
