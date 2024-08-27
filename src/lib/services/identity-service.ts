import { ConfidentialClientApplication } from '@azure/msal-node';
import type { LoggingService } from './logging-service';
import { Client } from '@microsoft/microsoft-graph-client';
import type { UserService } from './user-service';
import type { UserExtensionAttributes } from '$lib/common/models/user-extension-attributes';

export class IdentityService {
	private cca = new ConfidentialClientApplication({
		auth: {
			authority: `https://login.microsoftonline.com/${process.env.AADB2C_TENANT_ID}`,
			clientId: process.env.AADB2C_PROVIDER_CLIENT_ID!,
			clientSecret: process.env.AADB2C_PROVIDER_CLIENT_SECRET!
		}
	});

	constructor(
		private log: LoggingService,
		private userService: UserService
	) {}

	async updateUserAttributes(attributes: UserExtensionAttributes) {
		const currentUser = await this.userService.getUser();

		if (!currentUser) {
			this.log.error('Failed to get current user for updating user attributes');
			return;
		}

		const graphClient = await this.getGraphClient();

		if (!graphClient) {
			return;
		}

		await graphClient
			.api(`/users/${currentUser.id}`)
			.update(this.prependAppIdToAttributes(attributes));
	}

	private async getGraphClient(): Promise<Client | undefined> {
		const accessToken = await this.getAccessToken();

		if (!accessToken) {
			this.log.error('Failed to get access token for identity service Graph client');
			return undefined;
		}

		return Client.init({
			authProvider: (done) => {
				done(null, accessToken);
			}
		});
	}

	private async getAccessToken(): Promise<string | undefined> {
		const authResult = await this.cca.acquireTokenByClientCredential({
			scopes: ['https://graph.microsoft.com/.default']
		});

		return authResult?.accessToken;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private prependAppIdToAttributes<T extends Record<string, any>>(
		attributes: T
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): { [key: string]: any } {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result: { [key: string]: any } = {};
		const clientId = process.env.AADB2C_EXTENSIONS_APP_CLIENT_ID?.replace(/-/g, '');
		for (const key in attributes) {
			// eslint-disable-next-line no-prototype-builtins
			if (attributes.hasOwnProperty(key)) {
				result[`extension_${clientId}_${key}`] = attributes[key];
			}
		}
		return result;
	}
}
