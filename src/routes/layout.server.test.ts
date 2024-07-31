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

		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		await load({ request, cookies });

		expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
	});

	it('should log error if StaticWebAppsAuthCookie is missing', async () => {
		process.env.NODE_ENV = 'development';

		const request = {};
		const cookies = { get: vi.fn().mockReturnValue(null) };

		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		await load({ request, cookies });

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

		const request = {
			headers: {
				get: vi.fn().mockReturnValue(base64Encoded)
			}
		};
		const cookies = { get: vi.fn() };

		const result = await load({ request, cookies });

		expect(result?.isLoggedIn).toBe(true);
		expect(result?.user).toEqual(expected);
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

		const request = {};
		const cookies = { get: vi.fn().mockReturnValue(base64Encoded) };

		const result = await load({ request, cookies });

		expect(result?.isLoggedIn).toBe(true);
		expect(result?.user).toEqual(expected);
	});
});
