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
				routes: [
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
					},
					{
						route: '/*',
						allowedRoles: ['anonymous', 'authenticated']
					}
				]
			}
		})
	}
};

export default config;
