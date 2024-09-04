import type { LocalUserPayload } from '$lib/common/models/local-user-payload';
import type { User } from '$lib/common/models/user';
import { mapLocalUserToUser } from '$lib/utils/mappers';
import type { LoggingService } from './logging-service';

export interface IUserService {
	getUser(): Promise<User | null>;
}

export class UserService implements IUserService {
	constructor(
		private fetchFn: typeof fetch,
		private log: LoggingService
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
}
