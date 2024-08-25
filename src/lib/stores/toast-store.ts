import { writable } from 'svelte/store';

export type ToastProps = {
	id: number;
	message: string;
	icon: 'success';
	dismissable: boolean;
};

const createToastStore = () => {
	const { subscribe, update } = writable<ToastProps[]>([]);

	let id = 0;

	return {
		subscribe,
		addToast: (message: string, icon: 'success' = 'success', dismissable = false) => {
			update((toasts) => [...toasts, { id: id++, message, icon, dismissable }]);
		},
		removeToast: (id: number) => {
			update((toasts) => toasts.filter((toast) => toast.id !== id));
		}
	};
};

export const toastStore = createToastStore();
