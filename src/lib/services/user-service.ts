import type { DBUser } from '$lib/common/entities/db-user';
import type { User } from '$lib/common/models/user';
import { parseDBResponse } from '$lib/utils/utils';
import type { LoggingService } from './logging-service';

export class UserService {
	constructor(
		private fetchFn: typeof fetch,
		private log: LoggingService
	) {}

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

		return { id: user.id, email: user.email };
	}

	async createUser(user: User): Promise<User | null> {
		const dbUser: DBUser = {
			id: user.id,
			email: user.email
		};

		const response = await this.fetchFn(`/data-api/rest/User`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dbUser)
		});

		if (!response.ok) {
			this.log.error(response);
			return null;
		}

		return user;
	}
}
