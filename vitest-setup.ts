import '@testing-library/jest-dom/vitest';
import { readable } from 'svelte/store';
import type { Navigation, Page } from '@sveltejs/kit';
import { vi } from 'vitest';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as stores from '$app/stores';
import type { User } from '$lib/common/models/user';
import { faker, simpleFaker } from '@faker-js/faker';

export const createMockUser = (user: Partial<User> = {}): User => {
	const defaultUser: User = {
		id: simpleFaker.string.uuid(),
		email: faker.internet.email(),
		onboarded: true,
		name: faker.person.fullName(),
		roles: ['anonymous', 'authenticated']
	};

	return {
		...defaultUser,
		...user
	};
};

export const createMockPage = (page: Partial<Page> = {}): Page => {
	const defaultPage: Page = {
		url: new URL('http://localhost'),
		params: {},
		route: {
			id: null
		},
		status: 200,
		error: null,
		data: {},
		form: undefined,
		state: {}
	};

	return {
		...defaultPage,
		...page
	};
};

vi.mock('$app/stores', (): typeof stores => {
	const getStores: typeof stores.getStores = () => {
		const navigating = readable<Navigation | null>(null);
		const page = readable<Page>(createMockPage());
		const updated = { subscribe: readable(false).subscribe, check: async () => false };

		return { navigating, page, updated };
	};

	const page: typeof stores.page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		}
	};
	const navigating: typeof stores.navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		}
	};
	const updated: typeof stores.updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		},
		check: async () => false
	};

	return {
		getStores,
		navigating,
		page,
		updated
	};
});
