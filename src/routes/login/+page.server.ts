import { redirect } from '@sveltejs/kit';

export const load = () => {
	const redirectUrl = `/.auth/login/aad`;
	redirect(301, redirectUrl);
};
