import { redirect } from '@sveltejs/kit';

export const load = ({ url }) => {
	const redirectUrl = `${url.origin}/api/user/oauthcallback`;
	const loginUrl = `/.auth/login/aad?post_login_redirect_uri=${encodeURIComponent(redirectUrl)}`;
	redirect(301, loginUrl);
};
