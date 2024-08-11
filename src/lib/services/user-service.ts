import type { DBUser } from '$lib/common/entities/db-user';
import type { LocalUserPayload } from '$lib/common/models/local-user-payload';
import type { User } from '$lib/common/models/user';
import { parseDBResponse } from '$lib/utils/utils';
import type { LoggingService } from './logging-service';

export class UserService {
	constructor(
		private fetchFn: typeof fetch,
		private log: LoggingService
	) {}

	async getLocalUser(): Promise<LocalUserPayload | null> {
		const response = await this.fetchFn('/.auth/me');

		if (!response.ok) {
			return null;
		}

		const localUser: LocalUserPayload = await response.json();

		if (!localUser.clientPrincipal) {
			return null;
		}

		return localUser;
	}

	async getUser(id: string): Promise<User | null> {
		const role = await this.getUserRole();
		if (!role) {
			return null;
		}

		const response = await this.fetchFn(`/data-api/rest/User/Id/${id}`, {
			headers: {
				'X-MS-API-ROLE': role
			}
		});

		if (!response.ok) {
			return null;
		}

		const user = (await parseDBResponse<DBUser>(response))?.[0];

		if (!user) {
			return null;
		}

		return { id: user.Id, email: user.Email, onboarded: user.Onboarded };
	}

	async createUser(user: User): Promise<User | null> {
		const role = await this.getUserRole();
		if (!role) {
			return null;
		}

		const dbUser: DBUser = {
			Id: user.id,
			Email: user.email,
			Onboarded: user.onboarded
		};

		const response = await this.fetchFn(`/data-api/rest/User`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-MS-API-ROLE': role
			},
			body: JSON.stringify(dbUser)
		});

		if (!response.ok) {
			return null;
		}

		return user;
	}

	private async getUserRole(): Promise<string | null> {
		const localUser = await this.getLocalUser();

		if (!localUser) {
			return null;
		}

		const role = localUser.clientPrincipal.userRoles.find((r) => r === 'authenticated');

		if (!role) {
			return null;
		}

		return role;
	}
}
