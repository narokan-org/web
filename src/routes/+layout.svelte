<script context="module">
	import { t, loadTranslations } from '$lib/translations';
	import '../app.css';

	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url }) => {
		const { pathname } = url;

		const locale = 'en';
		await loadTranslations(locale, pathname);

		return {};
	};
</script>

<slot></slot>
