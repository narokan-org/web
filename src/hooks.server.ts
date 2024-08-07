import { redirect, type Handle } from '@sveltejs/kit';
import { UserService } from '$lib/services/user-service';
import { TelemetryService } from '$lib/services/telemetry-service';
import { LoggingService } from '$lib/services/logging-service';
import { isProduction } from '$lib/utils/utils';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.loggingService = new LoggingService();
	event.locals.telemetryService = new TelemetryService(event.locals.loggingService);
	event.locals.userService = new UserService(event.fetch, event.locals.loggingService);

	const protectedRoutes = [
		'/assessments',
		'/controls',
		'/dashboard',
		'/entities',
		'/risks',
		'/settings'
	];

	if (protectedRoutes.includes(event.url.pathname)) {
		const user = event.locals.userService.getLocalUser(event.locals, event.request, event.cookies);

		if (!user) {
			const redirectUrl = event.url.pathname + event.url.search;
			event.locals.loggingService.debug(`Creating redirect url cookie: ${redirectUrl}`);
			event.cookies.set('basel-redirect-url', redirectUrl, {
				path: '/',
				httpOnly: true
			});

			throw redirect(302, '/login');
		}
	}

	const response = await resolve(event);
	return response;
};
