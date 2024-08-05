import { isProduction } from '$lib/utils/utils.js';
import { fail, type Cookies } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
	identityProvider: string;
	userId: string;
	userDetails: string;
	userRoles: string[];
}

export const load = async ({ locals, fetch, request, cookies }) => {
	// For production, x-ms-client-principal is passed to the server in the request headers. For local development that is not the case so we decode the cookie directly. This is a limitation of swa cli currently.
	const jwtUser = isProduction()
		? decodeByHeader(locals, request)
		: decodeByCookie(locals, cookies);

	if (!jwtUser) {
		locals.loggingService.error('User is not logged in.');
		fail(500);
		return;
	}

	let user = await locals.userService.getUser(jwtUser.userId);

	if (!user) {
		user = await locals.userService.createUser({ id: jwtUser.userId, email: jwtUser.userDetails });
	}

	return { isLoggedIn: true, jwtUser };
};

function decodeByHeader(locals: App.Locals, request: Request) {
	locals.loggingService.debug('Decoding by header');

	const header = request.headers.get('x-ms-client-principal');

	if (!header) {
		return null;
	}

	const encoded = Buffer.from(header!, 'base64');
	const decoded: JwtPayload = JSON.parse(encoded.toString('ascii'));

	return decoded;
}

function decodeByCookie(locals: App.Locals, cookies: Cookies) {
	locals.loggingService.debug('Decoding by cookie');

	const token = cookies.get('StaticWebAppsAuthCookie');

	if (!token) {
		return null;
	}

	let decoded: JwtPayload = jwtDecode(token, { header: true });

	return decoded;
}
