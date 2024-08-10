import { isProduction } from '$lib/utils/utils';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, request, cookies }) => {
	const localUser = await locals.userService.getLocalUser(locals, request, cookies);
	console.log(localUser);

	if (!localUser) {
		return { isLoggedIn: false };
	}

	const email = isProduction()
		? localUser.clientPrincipal.claims.find((c) => c.typ === 'emails')?.val
		: localUser.clientPrincipal.userDetails;

	if (!email) {
		return { isLoggedIn: false };
	}

	let user = await locals.userService.getUser(email);

	if (!user) {
		user = await locals.userService.createUser({
			id: localUser.clientPrincipal.userId,
			email,
			onboarded: false
		});
	} else if (!user.onboarded && !request.url.includes('/onboarding')) {
		locals.loggingService.debug('User is not onboarded. Redirecting to onboarding.');
		throw redirect(302, '/onboarding');
	}

	return { isLoggedIn: true, user };
};
