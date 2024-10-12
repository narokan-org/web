import { error, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	'update-general-settings': async ({ locals, request, cookies }) => {
		const currentCompany = cookies.get('narokan-current-company');

		if (!currentCompany) {
			locals.loggingService.error('No workspace found.');
			return error(400, 'No workspace found.');
		}

		const formData = await request.formData();
		const workspaceName = formData.get('workspaceName') as string;

		locals.loggingService.debug(`Updating workspace name to ${workspaceName}`);

		if (!workspaceName || !workspaceName.trim()) {
			locals.loggingService.error('Workspace name is required');
			return error(400, {
				message: 'Workspace name is required'
			});
		}

		if (workspaceName.length > 16) {
			locals.loggingService.error('Workspace name must be less than 16 characters');
			return error(400, {
				message: 'Workspace name must be less than 16 characters'
			});
		}

		await locals.companyService.updateCompany({
			id: Number(currentCompany),
			name: workspaceName
		});

		return {
			success: true
		};
	}
};

export const load = async ({ locals, cookies }) => {
	const currentCompany = cookies.get('narokan-current-company');

	if (!currentCompany) {
		throw error(400, 'No workspace found.');
	}

	const company = (await locals.companyService.getCompanies()).filter(
		(c) => c.id === Number(currentCompany)
	);

	if (!company) {
		throw error(400, 'No workspace found.');
	}

	return {
		company
	};
};
