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
				auth: {
					identityProviders: {
						customOpenIdConnectProviders: {
							aadb2c: {
								registration: {
									clientIdSettingName: 'AADB2C_PROVIDER_CLIENT_ID',
									clientCredential: {
										clientSecretSettingName: 'AADB2C_PROVIDER_CLIENT_SECRET'
									},
									openIdConnectConfiguration: {
										wellKnownOpenIdConfiguration:
											'https://baselapp.b2clogin.com/baselapp.onmicrosoft.com/B2C_1_Basel_Sign_Up/v2.0/.well-known/openid-configuration'
									}
								},
								login: {
									nameClaimType: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
									scopes: [],
									loginParameterNames: []
								}
							}
						}
					}
				},
				responseOverrides: {
					401: {
						redirect: `/.auth/login/${process.env.NODE_ENV === 'production' ? 'aadb2c' : 'aad'}?post_login_redirect_uri=.referrer`,
						statusCode: 302
					}
				},
				routes: [
					{
						route: '/assessments',
						allowedRoles: ['authenticated']
					},
					{
						route: '/controls',
						allowedRoles: ['authenticated']
					},
					{
						route: '/dashboard',
						allowedRoles: ['authenticated']
					},
					{
						route: '/entities',
						allowedRoles: ['authenticated']
					},
					{
						route: '/risks',
						allowedRoles: ['authenticated']
					},
					{
						route: '/settings',
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
