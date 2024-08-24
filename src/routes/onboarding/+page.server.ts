import { fail, redirect, type Actions } from '@sveltejs/kit';
import { isProduction } from '$lib/utils/utils';
export const actions: Actions = {
	default: async ({ locals, request, cookies }) => {
		// TODO: Creation of a company should be done as a transaction with a stored procedure using an API function. Since this is a sensitive operation, it should be done server side with rollback capabilities.
		locals.loggingService.debug('Creating company');

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

		if (isProduction()) {
			await locals.identityService.updateUserAttributes({
				Onboarded: true
			});
		}

		cookies.set('basel/onboarded', 'true', {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 30
		});

		redirect(302, '/invite');
	}
};
