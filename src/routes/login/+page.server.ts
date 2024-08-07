import { redirect } from '@sveltejs/kit';

export const load = ({ locals, request, cookies }) => {
	const storedRedirectUrl = cookies.get('basel-redirect-url') ?? '/';

	cookies.delete('basel-redirect-url', { path: '/', httpOnly: true });

	locals.loggingService.debug(`Adding post_login_redirect_uri=${storedRedirectUrl}`);

	const redirectUrl = new URL(storedRedirectUrl, request.url).toString();

	throw redirect(
		302,
		`/.auth/login/aad?post_login_redirect_uri=${encodeURIComponent(redirectUrl)}`
	);
};
