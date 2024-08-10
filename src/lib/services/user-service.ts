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

	async getLocalUser(
		locals: App.Locals,
		request: Request,
		cookies: Cookies
	): Promise<LocalUserPayload | null> {
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
		const response = await this.fetchFn(`/data-api/rest/User/Id/${id}`);

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
		const dbUser: DBUser = {
			Id: user.id,
			Email: user.email,
			Onboarded: user.onboarded
		};
		this.log.debug(`Creating user: ${JSON.stringify(dbUser)}`);

		const response = await this.fetchFn(`/data-api/rest/User`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dbUser)
		});

		if (!response.ok) {
			this.log.error(`Failed to create user: ${JSON.stringify(response)}`);
			return null;
		}

		return user;
	}
}
