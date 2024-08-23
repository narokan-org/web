import { type Handle, type HandleFetch } from '@sveltejs/kit';
import { UserService } from '$lib/services/user-service';
import { LoggingService } from '$lib/services/logging-service';
import { CompanyService } from '$lib/services/company-service';
import { IdentityService } from '$lib/services/identity-service';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.loggingService = new LoggingService();
	event.locals.identityService = new IdentityService(event.locals.loggingService);
	event.locals.userService = new UserService(
		event.fetch,
		event.locals.loggingService,
		event.locals.identityService
	);
	event.locals.companyService = new CompanyService(
		event.fetch,
		event.locals.loggingService,
		event.locals.userService
	);

	const response = await resolve(event);
	return response;
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	const response = await fetch(request);

	const responseClone = response.clone();
	event.locals.loggingService.debug(
		`${request.method} request to ${request.url} returned status ${responseClone.status}`
	);
	event.locals.loggingService.debug(`Response status text: ${responseClone.statusText}`);
	event.locals.loggingService.debug(`Response body: ${await responseClone.text()}`);

	return response;
};
