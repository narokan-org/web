import { writable, derived } from 'svelte/store';

export function createFormStore<T>(initialValues: T) {
	const initialFormState = writable<T>(initialValues);
	const currentFormState = writable<T>(initialValues);

	const isDirty = derived(
		[initialFormState, currentFormState],
		([$initialFormState, $currentFormState]) =>
			JSON.stringify($initialFormState) !== JSON.stringify($currentFormState)
	);

	return {
		initialFormState,
		currentFormState,
		isDirty,
		reset: () => currentFormState.set(initialValues)
	};
}
