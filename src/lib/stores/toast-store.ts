import { writable } from 'svelte/store';

export type ToastProps = {
	id: number;
	message: string;
	icon: 'success' | 'error';
	dismissable: boolean;
};

const createToastStore = () => {
	const { subscribe, update } = writable<ToastProps[]>([]);

	let id = 0;

	return {
		subscribe,
		addToast: (message: string, icon: 'success' | 'error' = 'success', dismissable = false) => {
			const toastId = id++;
			update((toasts) => [...toasts, { id: toastId, message, icon, dismissable }]);

			if (!dismissable) {
				setTimeout(() => {
					update((toasts) => toasts.filter((toast) => toast.id !== toastId));
				}, 3000);
			}
		},
		removeToast: (id: number) => {
			update((toasts) => toasts.filter((toast) => toast.id !== id));
		}
	};
};

export const toastStore = createToastStore();
