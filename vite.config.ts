import { sveltekit } from '@sveltejs/kit/vite';
import { codecovSvelteKitPlugin } from '@codecov/sveltekit-plugin';
import { svelteTesting } from '@testing-library/svelte/vite';
import type { ViteDevServer } from 'vite';
import { defineConfig } from 'vitest/config';

const swaPlugin = () => ({
	name: 'configure-swa-proxy',
	configureServer(server: ViteDevServer) {
		server.middlewares.use((req, _, next) => {
			if (req.url === '/api/__render') {
				const originalUrl = req.headers['x-ms-original-url'];
				const parsedUrl = new URL(originalUrl as string);
				const rewrittenUrl = parsedUrl.pathname + parsedUrl.search;
				req.url = rewrittenUrl;
				req.originalUrl = rewrittenUrl;
			}
			next();
		});
	}
});

export default defineConfig({
	plugins: [
		swaPlugin(),
		sveltekit(),
		svelteTesting(),
		codecovSvelteKitPlugin({
			enableBundleAnalysis: true,
			bundleName: 'narokan',
			uploadToken: process.env.CODECOV_TOKEN
		})
	],
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'html', 'cobertura'],
			include: ['src/**/*.{svelete,ts}'],
			exclude: ['./vitest-setup.ts']
		},
		include: ['src/**/*.test.ts'],
		setupFiles: ['./vitest-setup.ts']
	}
});
