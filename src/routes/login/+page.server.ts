import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const redirectUrl = `${url.origin}/.auth/login/aad`;
	redirect(301, redirectUrl);
};
