import { redirect } from '@sveltejs/kit';

export const load = ({ locals, cookies }) => {
	const storedRedirectUrl = cookies.get('basel-redirect-url') ?? '/';
	cookies.delete('basel-redirect-url', { path: '/' });

	locals.loggingService.debug(`Adding post_login_redirect_uri=${storedRedirectUrl}`);
	redirect(301, `/.auth/login/aad?post_login_redirect_uri=${storedRedirectUrl}`);
};
