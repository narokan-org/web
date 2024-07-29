import { loadTranslations } from '$lib/translations';

export const load = async ({ url, data }) => {
	const { pathname } = url;

	await loadTranslations('en', pathname);

	return { ...data };
};
