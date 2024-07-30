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
	const user = isProduction ? decodeByHeader(request) : decodeByCookie(cookies);

	if (!user) {
		fail(500);
		return;
	}

	return { isLoggedIn: true, user };
};

function decodeByHeader(request: Request) {
	const header = request.headers.get('x-ms-client-principal');

	if (!header) {
		console.error('No header found');
		return null;
	}

	const encoded = Buffer.from(header!, 'base64');
	const decoded: JwtPayload = JSON.parse(encoded.toString('ascii'));

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
