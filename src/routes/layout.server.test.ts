import { describe, it, expect, vi } from 'vitest';
import { load } from './+layout.server';

describe('layout.server', () => {
	it('should log error if x-ms-client-principal is missing', async () => {
		process.env.NODE_ENV = 'production';
		const request = {
			headers: {
				get: vi.fn().mockReturnValue(null)
			}
		};
		const cookies = { get: vi.fn() };
		const consoleErrorSpy = vi.fn();
		const locals = {
			loggingService: {
				debug: vi.fn(),
				error: consoleErrorSpy
			}
		};

		await load({ locals, request, cookies });

		expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
	});

	it('should log error if StaticWebAppsAuthCookie is missing', async () => {
		process.env.NODE_ENV = 'development';

		const consoleErrorSpy = vi.fn();
		const locals = {
			loggingService: {
				debug: vi.fn(),
				error: consoleErrorSpy
			}
		};
		const request = {};
		const cookies = { get: vi.fn().mockReturnValue(null) };

		await load({ locals, request, cookies });

		expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
	});

	it('should return user from header', async () => {
		process.env.NODE_ENV = 'production';
		const expected = {
			identityProvider: 'aad',
			userId: '1',
			userDetails: 'test@gmail.com',
			userRoles: ['anonymous', 'authenticated']
		};

		const jsonString = JSON.stringify(expected);
		const base64Encoded = Buffer.from(jsonString).toString('base64');

		const locals = {
			userService: {
				getUser: vi.fn(),
				createUser: vi.fn()
			},
			loggingService: {
				debug: vi.fn(),
				error: vi.fn()
			}
		};
		const request = {
			headers: {
				get: vi.fn().mockReturnValue(base64Encoded)
			}
		};
		const cookies = { get: vi.fn() };

		const result = await load({ locals, request, cookies });

		expect(result?.isLoggedIn).toBe(true);
		expect(result?.jwtUser).toEqual(expected);
	});

	it('should return user from cookie', async () => {
		process.env.NODE_ENV = 'development';
		const expected = {
			identityProvider: 'aad',
			userId: '1',
			userDetails: 'test@gmail.com',
			userRoles: ['anonymous', 'authenticated']
		};

		const jsonString = JSON.stringify(expected);
		const base64Encoded = Buffer.from(jsonString).toString('base64');

		const locals = {
			userService: {
				getUser: vi.fn(),
				createUser: vi.fn()
			},
			loggingService: {
				debug: vi.fn(),
				error: vi.fn()
			}
		};
		const request = {};
		const cookies = { get: vi.fn().mockReturnValue(base64Encoded) };

		const result = await load({ locals, request, cookies });

		expect(result?.isLoggedIn).toBe(true);
		expect(result?.jwtUser).toEqual(expected);
	});
});
