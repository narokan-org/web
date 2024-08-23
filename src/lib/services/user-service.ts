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

	async updateUserAttributes(attributes: UserExtensionAttributes) {
		const currentUser = await this.getUser();

		if (!currentUser) {
			this.log.error('Failed to get current user for updating user attributes');
			return;
		}

		const graphClient = await this.identityService.getGraphClient();

		if (!graphClient) {
			return;
		}

		this.log.debug(`Updating user attributes for user ${currentUser.id}`);
		await graphClient.api(`/users/${currentUser.id}`).update(attributes);
	}
}
