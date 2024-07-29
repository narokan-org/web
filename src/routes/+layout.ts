import { loadTranslations } from '$lib/translations';

export const load = async ({ url }) => {
	const { pathname } = url;

	await loadTranslations('en', pathname);

	return {};
};
