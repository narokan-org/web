import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'html', 'cobertura']
		},
		include: ['src/**/*.test.ts'],
		setupFiles: ['./setupTests.ts']
	}
});
