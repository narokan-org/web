import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, request, cookies }) => {
	const user = await locals.userService.getUser();
	locals.loggingService.debug(`Local user: ${JSON.stringify(user)}`);

	if (!user) {
		return { isLoggedIn: false };
	}

	const onboardedCookie = cookies.get('narokan-onboarded');

	if (onboardedCookie) {
		return { isLoggedIn: true, user };
	}

	if (!user.onboarded && !request.url.includes('/onboarding')) {
		locals.loggingService.debug('User is not onboarded. Redirecting to onboarding.');
		throw redirect(302, '/onboarding');
	}

	return { isLoggedIn: true, user };
};
