import type { Handle } from '@sveltejs/kit';
import { UserService } from '$lib/services/user-service';
import { TelemetryService } from '$lib/services/telemetry-service';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.telemetryService = new TelemetryService();
	event.locals.userService = new UserService(event.fetch, event.locals.telemetryService);

	const response = await resolve(event);
	return response;
};
