import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, request, cookies }) => {
	const localUser = locals.userService.getLocalUser(locals, request, cookies);

	if (!localUser) {
		return;
	}

	let user = await locals.userService.getUser(localUser.userId);

	if (!user) {
		user = await locals.userService.createUser({
			id: localUser.userId,
			email: localUser.userDetails
		});
	}

	return { isLoggedIn: true, user };
};
