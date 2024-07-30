import { isProduction } from '$lib/utils/utils.js';
import { fail, type Cookies } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
	identityProvider: string;
	userId: string;
	userDetails: string;
	userRoles: string[];
}

export const load = async ({ request, cookies }) => {
	// For production, x-ms-client-principal is passed to the server in the request headers. For local development that is not the case so we decode the cookie directly. This is a limitation of swa cli currently.
	const user = isProduction() ? decodeByHeader(request) : decodeByCookie(cookies);

	if (!user) {
		console.error('Could not find user.');
		fail(500);
		return;
	}

	return { isLoggedIn: true, user };
};

function decodeByHeader(request: Request) {
	console.log('Decoding by header');
	const header = request.headers.get('x-ms-client-principal');

	if (!header) {
		return null;
	}

	const encoded = Buffer.from(header!, 'base64');
	const decoded: JwtPayload = JSON.parse(encoded.toString('ascii'));

	return decoded;
}

function decodeByCookie(cookies: Cookies) {
	console.log('Decoding by cookie');
	const token = cookies.get('StaticWebAppsAuthCookie');

	if (!token) {
		return null;
	}

	let decoded: JwtPayload = jwtDecode(token, { header: true });

	return decoded;
}
