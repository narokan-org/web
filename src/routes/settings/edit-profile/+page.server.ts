import { fail, type Actions } from '@sveltejs/kit';
import type { User } from '$lib/common/models/user';

export const actions: Actions = {
	'edit-profile': async ({ locals, request, cookies }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;

		if (!fullName || !fullName.trim()) {
			return fail(400, {
				message: 'Full name is required'
			});
		}

		await locals.identityService.updateUserAttributes({
			FullName: fullName
		});

		const localUser: User = JSON.parse(cookies.get('narokan-user')!);

		localUser.name = fullName;

		cookies.set('narokan-user', JSON.stringify(localUser), {
			httpOnly: true,
			secure: true,
			path: '/'
		});

		return {
			success: true
		};
	}
};
