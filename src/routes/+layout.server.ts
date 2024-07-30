import { fail } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export const load = async ({ request, cookies }) => {
	console.log('load for auth');
	const header = request.headers.get('x-ms-client-principal');

	if (!header) {
		console.error('No header found');
		fail(500);
		return;
	}

	const encoded = Buffer.from(header!, 'base64');
	const decoded = encoded.toString('ascii');
	console.log('plain decoded token is:', decoded);
	console.log('decoded token is:', JSON.parse(decoded));

	let isLoggedIn = false;
	let claims = null;

	try {
		isLoggedIn = false;
	} catch (error) {
		console.error('Failed to decode token:', error);
	}

	return { isLoggedIn, claims };
};
