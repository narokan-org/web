import type { LoggingService } from './logging-service';
import type { UserService } from './user-service';
import { parseDBResponse } from '$lib/utils/utils';
export class DataAPIClient {
	private baseUrl = '/data-api/rest';
	constructor(
		private fetchFn: typeof fetch,
		private log: LoggingService,
		private userService: UserService
	) {}

	async get<T>(resource: string): Promise<T[] | null> {
		const role = (await this.userService.getUser())?.roles.find((r) => r === 'authenticated');

		if (!role) {
			return null;
		}

		const response = await this.fetchFn(`${this.baseUrl}/${resource}`, {
			headers: {
				'X-MS-API-ROLE': role
			}
		});

		if (!response.ok) {
			return null;
		}

		return await parseDBResponse<T>(response);
	}
}
