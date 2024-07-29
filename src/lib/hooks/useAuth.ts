import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

export function useAuth() {
	const auth = getContext<{ isLoggedIn: Writable<boolean>; claims: Writable<any> }>('auth');

	return auth;
}
