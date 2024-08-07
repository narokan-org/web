import { redirect } from '@sveltejs/kit';

export const load = ({ locals, request, cookies }) => {
	locals.loggingService.debug(`Headers received: ${JSON.stringify(request.headers)}`);

	// const storedRedirectUrl =
	// 	cookies.get('basel-redirect-url') ?? request.headers.get('X-Basel-Redirect-Url') ?? '/';

	// cookies.delete('basel-redirect-url', { path: '/', httpOnly: true });

	// const redirectUrl = new URL(storedRedirectUrl, request.url).toString();

	// locals.loggingService.debug(`Adding post_login_redirect_uri=${redirectUrl}`);
	throw redirect(302, `/.auth/login/aad`);
};
