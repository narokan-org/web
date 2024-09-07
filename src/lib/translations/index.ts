import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';
import lang from './lang.json';

export const config: Config<{ placeholder?: string; value?: any; count?: number }> = {
	initLocale: 'en',
	translations: {
		en: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
