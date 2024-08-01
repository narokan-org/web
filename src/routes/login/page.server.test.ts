import { describe, it, expect, vi } from 'vitest';
import { load } from './+page.server';

vi.mock('@sveltejs/kit', () => ({
	redirect: vi.fn()
}));

describe('login page', () => {
	it('redirects to the azure login page', async () => {
		const mockUrl = {
			origin: 'http://localhost:3000'
		};

		await load({ url: mockUrl });

		const { redirect } = await import('@sveltejs/kit');
		expect(redirect).toHaveBeenCalledWith(301, 'http://localhost:3000/.auth/login/aad');
	});
});
