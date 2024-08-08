import { isProduction } from '$lib/utils/utils';
import { redirect } from '@sveltejs/kit';

export const load = () => {
	redirect(302, `/.auth/login/${isProduction() ? 'aadb2c' : 'aad'}`);
};
