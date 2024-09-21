import { createRisk } from '$lib/actions/create-risk';
import { loadCreateRiskModal } from '$lib/data-loaders/create-risk-modal';
import type { PageServerLoad } from './$types';

export const actions = {
	'create-risk': createRisk
};

export const load: PageServerLoad = async ({ locals, cookies }) => {
	const data = {
		createRiskModalData: await loadCreateRiskModal({ locals, cookies })
	};

	return data;
};
