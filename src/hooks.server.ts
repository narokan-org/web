import { redirect, type Handle } from '@sveltejs/kit';
import { UserService } from '$lib/services/user-service';
import { TelemetryService } from '$lib/services/telemetry-service';
import { LoggingService } from '$lib/services/logging-service';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.loggingService = new LoggingService();
	event.locals.telemetryService = new TelemetryService(event.locals.loggingService);
	event.locals.userService = new UserService(event.fetch, event.locals.loggingService);

	const protectedRoutes = [
		'/assessments',
		'/controls',
		'/dashboard',
		'/entities',
		'/logout',
		'/risks',
		'/settings'
	];

	if (protectedRoutes.includes(event.url.pathname)) {
		const user = await event.locals.userService.getUser();

		if (!user) {
			throw redirect(302, '/login');
		}
	}

	const response = await resolve(event);
	return response;
};
