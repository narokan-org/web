import { fail } from '@sveltejs/kit';

export const load = async ({ request, cookies }) => {
	console.log('load for auth');
	const header = request.headers.get('x-ms-client-principal');

	if (!header) {
		console.error('No header found');
		fail(500);
		return;
	}

	const encoded = Buffer.from(header!, 'base64');
	const decoded: {
		identityProvider: string;
		userId: string;
		userDetails: string;
		userRoles: string[];
	} = JSON.parse(encoded.toString('ascii'));

	const isLoggedIn = decoded !== null;
	console.log(`returning: ${JSON.stringify({ isLoggedIn, decoded })}`);
	return { isLoggedIn, decoded };
};
