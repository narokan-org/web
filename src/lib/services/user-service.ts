import type { LocalUserPayload } from '$lib/common/models/local-user-payload';
import type { User } from '$lib/common/models/user';
import type { UserExtensionAttributes } from '$lib/common/models/user-extension-attributes';
import { mapLocalUserToUser } from '$lib/utils/mappers';
import type { IdentityService } from './identity-service';
import type { LoggingService } from './logging-service';

export class UserService {
	constructor(
		private fetchFn: typeof fetch,
		private log: LoggingService,
		private identityService: IdentityService
	) {}

	async getUser(): Promise<User | null> {
		const response = await this.fetchFn('/.auth/me');

		if (!response.ok) {
			return null;
		}

		const localUser: LocalUserPayload = await response.json();

		if (!localUser.clientPrincipal) {
			return null;
		}

		return mapLocalUserToUser(localUser);
	}

	async updateUserAttributes(userId: string, attributes: UserExtensionAttributes) {
		const graphClient = await this.identityService.getGraphClient();

		if (!graphClient) {
			return;
		}

		await graphClient.api(`/users/${userId}`).update(attributes);
	}
}
