import { describe, it, expect, vi } from 'vitest';
import { load } from './+page.server';

vi.mock('@sveltejs/kit', () => ({
	redirect: vi.fn()
}));

describe('logout page', () => {
	it('redirects to the azure logout page', async () => {
		load();

		const { redirect } = await import('@sveltejs/kit');
		expect(redirect).toHaveBeenCalledWith(301, '/.auth/logout');
	});
});
