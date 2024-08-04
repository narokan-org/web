import type { DBUser } from '$lib/common/entities/db-user';
import type { User } from '$lib/common/models/user';
import { parseDBResponse } from '$lib/utils/utils';

export class UserService {
	constructor(private fetchFn: typeof fetch) {}

	async getUser(id: string): Promise<User | null> {
		const response = await this.fetchFn(`/data-api/rest/users/id/${id}`);

		if (!response.ok) {
			console.debug(`Failed to get user with id ${id}`);
			console.error(response);
			return null;
		}

		const user = (await parseDBResponse<DBUser>(response))?.[0];

		if (!user) {
			console.debug(`User with id ${id} not found`);
			return null;
		}

		return { id: user.id, email: user.email };
	}

	async createUser(user: User): Promise<User | null> {
		const dbUser: DBUser = {
			id: user.id,
			email: user.email
		};

		const response = await this.fetchFn(`/data-api/rest/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dbUser)
		});

		if (!response.ok) {
			console.debug(`Failed to create user with id ${user.id}`);
			console.debug(`Response is ${response.status} ${response.statusText}`);
			return null;
		}

		return user;
	}
}
