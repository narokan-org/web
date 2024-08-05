import { v4 as uuidv4 } from 'uuid';
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

		return { id: user.user_id, email: user.email };
	}

	async createUser(user: User): Promise<User | null> {
		const dbUser: DBUser = {
			id: uuidv4(),
			user_id: user.id,
			email: user.email
		};
		console.log(`Creating user ${JSON.stringify(dbUser)}`);
		const response = await this.fetchFn(`/data-api/rest/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dbUser)
		});

		if (!response.ok) {
			console.debug(`Failed to create user with id ${user.id}`);
			const contentType = response.headers.get('Content-Type');
			if (contentType && contentType.includes('application/json')) {
				const jsonResponse = await response.json();
				console.debug(`Response is ${JSON.stringify(jsonResponse)}`);
			} else {
				const textResponse = await response.text();
				console.debug(`Response is ${textResponse}`);
			}
			return null;
		}

		return user;
	}
}
