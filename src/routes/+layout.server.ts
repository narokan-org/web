import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, request, cookies }) => {
	await locals.userService.testAuthFetch();
	const localUser = locals.userService.getLocalUser(locals, request, cookies);

	if (!localUser) {
		return { isLoggedIn: false };
	}

	let user = await locals.userService.getUser(localUser.userId);

	if (!user) {
		user = await locals.userService.createUser({
			id: localUser.userId,
			email: localUser.userDetails,
			onboarded: false
		});
	} else if (!user.onboarded && !request.url.includes('/onboarding')) {
		locals.loggingService.debug('User is not onboarded. Redirecting to onboarding.');
		throw redirect(302, '/onboarding');
	}

	return { isLoggedIn: true, user };
};
