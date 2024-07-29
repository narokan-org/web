<script>
	import { loadTranslations } from '$lib/translations';
	import Header from '$lib/components/header/header.svelte';
	import '../app.css';

	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url }) => {
		const { pathname } = url;

		const locale = 'en';
		await loadTranslations(locale, pathname);

		return {};
	};
</script>

<Header />

<slot></slot>
