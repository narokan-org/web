import type { Handle } from '@sveltejs/kit';
import { UserService } from '$lib/services/user-service';
import { TelemetryService } from '$lib/services/telemetry-service';
import { LoggingService } from '$lib/services/logging-service';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.telemetryService = new TelemetryService();
	event.locals.loggingService = new LoggingService();
	event.locals.userService = new UserService(event.fetch, event.locals.loggingService);

	const response = await resolve(event);
	return response;
};
