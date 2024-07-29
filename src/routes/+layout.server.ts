import { jwtDecode } from 'jwt-decode';

export const load = async ({ cookies }) => {
	const token = cookies.get('StaticWebAppsAuthCookie');
	let isLoggedIn = false;
	let claims = null;

	if (token) {
		try {
			claims = jwtDecode(token, { header: true });
			isLoggedIn = true;
		} catch (error) {
			console.error('Failed to decode token:', error);
		}
	}

	return { isLoggedIn, claims };
};
