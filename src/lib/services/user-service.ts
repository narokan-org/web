import type { Cookies } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';
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
			this.log.error(`Failed to get local user: ${JSON.stringify(response)}`);
			return null;
		}

		const localUser: LocalUserPayload = await response.json();

		if (!localUser.clientPrincipal) {
			this.log.info('User is not logged in.');
			return null;
		}

		return localUser;
	}

	async getUser(id: string): Promise<User | null> {
		const role = await this.getUserRole();
		if (!role) {
			this.log.error('Failed to get user role');
			return null;
		}

		const response = await this.fetchFn(`/data-api/rest/User/Id/${id}`, {
			headers: {
				'X-MS-API-ROLE': role
			}
		});

		if (!response.ok) {
			this.log.debug(`Failed to get user with id ${id}`);
			this.log.error(response);
			return null;
		}

		const user = (await parseDBResponse<DBUser>(response))?.[0];

		if (!user) {
			this.log.debug(`User with id ${id} not found`);
			return null;
		}

		return { id: user.Id, email: user.Email, onboarded: user.Onboarded };
	}

	async createUser(user: User): Promise<User | null> {
		const role = await this.getUserRole();
		if (!role) {
			this.log.error('Failed to get user role');
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
			this.log.error(
				`Failed to create user status and status text: ${response.status} ${response.statusText} ${await response.text()}`
			);
			return null;
		}

		return user;
	}

	private async getUserRole(): Promise<string | null> {
		const localUser = await this.getLocalUser();

		if (!localUser) {
			this.log.error('Failed to get local user');
			return null;
		}

		const role = localUser.clientPrincipal.userRoles.find((r) => r === 'authenticated');

		if (!role) {
			this.log.error('User is not authenticated');
			return null;
		}

		return role;
	}
}
