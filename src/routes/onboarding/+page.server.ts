import { fail, redirect, type Actions } from '@sveltejs/kit';
import { currentEnvironment } from '$lib/utils/utils';
export const actions: Actions = {
	default: async ({ locals, request, cookies }) => {
		// TODO: Creation of a company should be done as a transaction with a stored procedure using an API function. Since this is a sensitive operation, it should be done server side with rollback capabilities.
		locals.loggingService.debug('Creating company');

		const formData = await request.formData();
		const companyName = formData.get('workspace-name') as string;
		const teamSize = formData.get('team-size') as string;
		const companyRole = formData.get('role') as
			| 'Analyst'
			| 'C-Level'
			| 'Director'
			| 'Manager'
			| 'Specialist'
			| 'Stakeholder'
			| 'Other'
			| undefined;

		if (!companyName.trim()) {
			return fail(400, {
				message: 'Company name is required'
			});
		}

		const newCompany = await locals.companyService.createCompany({ name: companyName });

		if (!newCompany) {
			return fail(500, { message: 'Failed to create company' });
		}

		if (teamSize || companyRole) {
			await locals.companyService.submitOnboardingSurvey({ teamSize, companyRole });
		}

		if (currentEnvironment() !== 'local') {
			await locals.identityService.updateUserAttributes({
				Onboarded: true
			});
		}

		cookies.set('narokan-onboarded', 'true', {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 30
		});

		redirect(302, '/invite');
	}
};
