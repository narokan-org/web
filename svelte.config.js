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
							aadb2c_sign_in: {
								registration: {
									clientIdSettingName: 'AADB2C_PROVIDER_CLIENT_ID',
									clientCredential: {
										clientSecretSettingName: 'AADB2C_PROVIDER_CLIENT_SECRET'
									},
									openIdConnectConfiguration: {
										wellKnownOpenIdConfiguration:
											'https://baselapp.b2clogin.com/baselapp.onmicrosoft.com/B2C_1_Basel_Sign_In/v2.0/.well-known/openid-configuration'
									}
								},
								login: {
									nameClaimType: 'email',
									scopes: ['openid', 'profile', 'offline_access'],
									loginParameterNames: []
								}
							},
							aadb2c_sign_up: {
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
									nameClaimType: 'email',
									scopes: ['openid', 'profile', 'offline_access'],
									loginParameterNames: []
								}
							}
						}
					}
				},
				responseOverrides: {
					401: {
						redirect: `/.auth/login/${process.env.NODE_ENV === 'production' ? 'aadb2c_sign_in' : 'aad'}?post_login_redirect_uri=.referrer`,
						statusCode: 302
					}
				},
				routes: [
					{
						route: '/login',
						redirect: `/.auth/login/${process.env.BASEL_ENVIRONMENT === 'production' ? 'aadb2c_sign_in' : 'aad'}`
					},
					{
						route: '/signup',
						redirect: `/.auth/login/aadb2c_sign_up`
					},
					{
						route: '/logout',
						redirect: `/.auth/logout`
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
					}
				]
			}
		})
	}
};

export default config;
