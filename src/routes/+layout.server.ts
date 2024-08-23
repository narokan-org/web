import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, request }) => {
	const user = await locals.userService.getUser();
	locals.loggingService.debug(`Local user: ${JSON.stringify(user)}`);

	if (!user) {
		return { isLoggedIn: false };
	}

	if (!user.onboarded && !request.url.includes('/onboarding')) {
		locals.loggingService.debug('User is not onboarded. Redirecting to onboarding.');
		throw redirect(302, '/onboarding');
	}

	return { isLoggedIn: true, user };
};
