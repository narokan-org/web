import { describe, it, expect, vi } from 'vitest';
import { load } from './+page.server';

vi.mock('@sveltejs/kit', () => ({
	redirect: vi.fn()
}));

describe('login page', () => {
	it('redirects to the azure login page', async () => {
		load();

		const { redirect } = await import('@sveltejs/kit');
		expect(redirect).toHaveBeenCalledWith(302, '/.auth/login/aad');
	});
});
