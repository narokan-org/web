import type { Cookies } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';
import type { DBUser } from '$lib/common/entities/db-user';
import type { JwtPayload } from '$lib/common/models/jwt-payload';
import type { User } from '$lib/common/models/user';
import { isProduction, parseDBResponse } from '$lib/utils/utils';
import type { LoggingService } from './logging-service';

export class UserService {
	constructor(
		private fetchFn: typeof fetch,
		private log: LoggingService
	) {}

	getLocalUser(locals: App.Locals, request: Request, cookies: Cookies): JwtPayload | null {
		// For production, x-ms-client-principal is passed to the server in the request headers. For local development that is not the case so we decode the cookie directly. This is a limitation of swa cli currently.
		const jwtUser = isProduction()
			? this.decodeByHeader(locals, request)
			: this.decodeByCookie(locals, cookies);

		if (!jwtUser) {
			this.log.info('User is not logged in.');
			return null;
		}

		return jwtUser;
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

		return { id: user.Id, email: user.Email };
	}

	async createUser(user: User): Promise<User | null> {
		const dbUser: DBUser = {
			Id: user.id,
			Email: user.email
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

	private decodeByHeader(locals: App.Locals, request: Request) {
		locals.loggingService.debug('Decoding by header');

		const header = request.headers.get('x-ms-client-principal');

		if (!header) {
			this.log.info('x-ms-client-principal header is missing');
			return null;
		}

		const encoded = Buffer.from(header!, 'base64');
		const decoded: JwtPayload = JSON.parse(encoded.toString('ascii'));

		return decoded;
	}

	private decodeByCookie(locals: App.Locals, cookies: Cookies) {
		locals.loggingService.debug('Decoding by cookie');

		const token = cookies.get('StaticWebAppsAuthCookie');

		if (!token) {
			this.log.info('StaticWebAppsAuthCookie cookie is missing');
			return null;
		}

		let decoded: JwtPayload = jwtDecode(token, { header: true });

		return decoded;
	}
}
