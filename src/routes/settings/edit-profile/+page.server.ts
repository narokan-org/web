import { fail, type Actions } from '@sveltejs/kit';
import type { User } from '$lib/common/models/user';

export const actions: Actions = {
	'edit-profile': async ({ locals, request, cookies }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!fullName || !fullName.trim()) {
			return fail(400, {
				message: 'Full name is required'
			});
		}

		if (password || confirmPassword) {
			if (!password || !confirmPassword) {
				return fail(400, {
					message: 'Both password and confirm password must be provided'
				});
			}

			if (password !== confirmPassword) {
				return fail(400, {
					message: 'Passwords do not match'
				});
			}
		}

		await locals.identityService.updateUserAttributes({
			FullName: fullName
		});

		await locals.identityService.updatePassword({
			password
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
