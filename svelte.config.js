import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import azure from 'svelte-adapter-azure-swa';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: azure({
			customStaticWebAppConfig: {
				responseOverrides: {
					401: {
						redirect: '/.auth/login/aad?post_login_redirect_uri=.referrer',
						statusCode: 302
					}
				},
				routes: [
					{
						route: '/dashboard',
						allowedRoles: ['authenticated']
					},
					{
						route: '/risks',
						allowedRoles: ['authenticated']
					},
					{
						route: '/login',
						rewrite: '/.auth/login/aad',
						allowedRoles: ['anonymous', 'authenticated']
					},
					{
						route: '/.auth/login/github',
						statusCode: 404
					},
					{
						route: '/.auth/login/twitter',
						statusCode: 404
					}
				]
			}
		})
	}
};

export default config;
