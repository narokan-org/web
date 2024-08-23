import { ConfidentialClientApplication } from '@azure/msal-node';
import type { LoggingService } from './logging-service';
import { Client } from '@microsoft/microsoft-graph-client';

export class IdentityService {
	private cca = new ConfidentialClientApplication({
		auth: {
			authority: `https://login.microsoftonline.com/${process.env.AZURE_ADB2C_TENANT_ID}`,
			clientId: process.env.AZURE_ADB2C_CLIENT_ID!,
			clientSecret: process.env.AZURE_ADB2C_CLIENT_SECRET!
		}
	});

	constructor(private log: LoggingService) {}

	async getGraphClient(): Promise<Client | undefined> {
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
}
