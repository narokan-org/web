import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, request, cookies }) => {
	const localUser = cookies.get('narokan-user');
	const user = localUser ? JSON.parse(localUser) : await locals.userService.getUser();

	if (!user) {
		return { isLoggedIn: false };
	}

	if (!localUser) {
		cookies.set('narokan-user', JSON.stringify(user), {
			httpOnly: true,
			secure: true,
			path: '/'
		});
	}

	const onboardedCookie = cookies.get('narokan-onboarded');

	if (onboardedCookie) {
		return { isLoggedIn: true, user };
	}

	if (user && !user.onboarded && !request.url.includes('/onboarding')) {
		locals.loggingService.debug('User is not onboarded. Redirecting to onboarding.');
		throw redirect(302, '/onboarding');
	}

	return { isLoggedIn: true, user };
};
