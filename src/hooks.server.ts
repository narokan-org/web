import type { Handle } from '@sveltejs/kit';
import { UserService } from '$lib/services/user-service';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.userService = new UserService(event.fetch);

	const response = await resolve(event);
	return response;
};
