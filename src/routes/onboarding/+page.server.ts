import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		// TODO: Creation of a company should be done as a transaction with a stored procedure using an API function. Since this is a sensitive operation, it should be done server side with rollback capabilities.
		const formData = await request.formData();
		const companyName = formData.get('workspace-name') as string;

		if (!companyName.trim()) {
			return fail(400, {
				message: 'Company name is required'
			});
		}

		const newCompany = await locals.companyService.createCompany({ name: companyName });

		if (!newCompany) {
			return fail(500, { message: 'Failed to create company' });
		}

		const currentUser = await locals.userService.getUser();
		if (!currentUser) {
			return fail(500, { message: 'Failed to get current user' });
		}

		await locals.userService.updateUser({ ...currentUser, onboarded: true });

		redirect(302, '/invite');
	}
};