import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
	const storedRedirectUrl = cookies.get('basel-redirect-url') ?? '/';
	cookies.delete('basel-redirect-url', { path: '/' });

	redirect(301, `/.auth/login/aad?post_login_redirect_uri=${storedRedirectUrl}`);
};
