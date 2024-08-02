import { describe, it, expect, vi } from 'vitest';
import { load } from './+page.server';

vi.mock('@sveltejs/kit', () => ({
	redirect: vi.fn()
}));

describe('login page', () => {
	it('redirects to the azure login page', async () => {
		const origin = 'http://localhost';
		load({ url: new URL(origin) });

		const { redirect } = await import('@sveltejs/kit');
		expect(redirect).toHaveBeenCalledWith(
			301,
			'/.auth/login/aad?post_login_redirect_uri=http%3A%2F%2Flocalhost%2Fapi%2Fuser%2Foauthcallback'
		);
	});
});
