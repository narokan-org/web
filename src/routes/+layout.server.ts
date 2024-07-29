import { jwtDecode } from 'jwt-decode';

export const load = async ({ cookies }) => {
	console.log('load for auth');
	const token = cookies.get('StaticWebAppsAuthCookie');
	let isLoggedIn = false;
	let claims = null;

	if (token) {
		try {
			claims = jwtDecode(token);
			console.log('claims:', claims);
			isLoggedIn = true;
		} catch (error) {
			console.error('Failed to decode token:', error);
		}
	}

	return { isLoggedIn, claims };
};
