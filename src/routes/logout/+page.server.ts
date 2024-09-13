import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: RequestHandler = async ({ cookies }) => {
	const allCookies = cookies.getAll();

	allCookies.forEach((cookie) => {
		cookies.delete(cookie.name, { path: '/' });
	});

	throw redirect(302, '/.auth/logout');
};
