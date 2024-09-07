import { ConfidentialClientApplication } from '@azure/msal-node';
import type { LoggingService } from './logging-service';
import {
	BatchRequestContent,
	BatchResponseContent,
	Client,
	type BatchRequestStep
} from '@microsoft/microsoft-graph-client';
import type { UserService } from './user-service';
import type { UserExtensionAttributes } from '$lib/common/models/user-extension-attributes';
import type { User } from '$lib/common/models/user';

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

	async getUsers(userIds?: string[]) {
		const graphClient = await this.getGraphClient();

		if (!graphClient) {
			return [];
		}

		const userRequests: BatchRequestStep[] = [];
		const selectProperties = `id,extension_${this.getExtensionAppClientId()}_FullName,extension_${this.getExtensionAppClientId()}_Onboarded,identities`;

		for (const userId of userIds ?? []) {
			let userRequest: BatchRequestStep = {
				id: userId,
				request: new Request(
					`https://graph.microsoft.com/users/${userId}?$select=${selectProperties}`,
					{ method: 'GET' }
				)
			};

			userRequests.push(userRequest);
		}

		if (!userIds) {
			userRequests.push({
				id: '1',
				request: new Request(`https://graph.microsoft.com/users?$select=${selectProperties}`, {
					method: 'GET'
				})
			});
		}

		const batchRequestContent = new BatchRequestContent(userRequests);
		const content = await batchRequestContent.getContent();
		const batchResponse = await graphClient.api('/$batch').post(content);
		const batchResponseContent = new BatchResponseContent(batchResponse);

		const userInfo: User[] = [];

		for (const userId of userIds ?? []) {
			const userResponse = batchResponseContent.getResponseById(userId);
			const userJson = await userResponse.json();

			const user = this.mapIdentityUserToUser(userJson);

			userInfo.push(user);
		}

		if (!userIds) {
			const usersResponse = batchResponseContent.getResponseById('1');
			const users = await usersResponse.json();

			for (const identityUser of users.value) {
				const user = this.mapIdentityUserToUser(identityUser);
				userInfo.push(user);
			}
		}

		return userInfo;
	}

	private mapIdentityUserToUser(identityUser: any): User {
		return {
			id: identityUser.id,
			email: identityUser['identities'].find((e: any) => e.signInType === 'emailAddress')
				?.issuerAssignedId,
			name: identityUser[`extension_${this.getExtensionAppClientId()}_FullName`],
			onboarded: identityUser[`extension_${this.getExtensionAppClientId()}_Onboarded`] ?? false,
			roles: []
		};
	}

	private getExtensionAppClientId(): string {
		return process.env.AADB2C_EXTENSIONS_APP_CLIENT_ID!.replace(/-/g, '');
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
		const clientId = this.getExtensionAppClientId();

		for (const key in attributes) {
			// eslint-disable-next-line no-prototype-builtins
			if (attributes.hasOwnProperty(key)) {
				result[`extension_${clientId}_${key}`] = attributes[key];
			}
		}
		return result;
	}
}
