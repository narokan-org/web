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
	console.log('Entering load function in +layout.server.ts');
	const user = isProduction ? decodeByHeader(request) : decodeByCookie(cookies);

	if (!user) {
		console.error('Could not find user.');
		fail(500);
		return;
	}

	return { isLoggedIn: true, user };
};

function decodeByHeader(request: Request) {
	const header = request.headers.get('x-ms-client-principal');

	if (!header) {
		return null;
	}

	const encoded = Buffer.from(header!, 'base64');
	console.log('Decoding header: ' + encoded.toString('ascii'));
	const decoded: JwtPayload = JSON.parse(encoded.toString('ascii'));
	console.log('Decoded header: ' + decoded);

	return decoded;
}

function decodeByCookie(cookies: Cookies) {
	const token = cookies.get('StaticWebAppsAuthCookie');

	if (!token) {
		console.error('No token found');
		return null;
	}

	let decoded: JwtPayload = jwtDecode(token, { header: true });

	return decoded;
}
