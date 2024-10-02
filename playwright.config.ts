import type { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: PlaywrightTestConfig = {
	name: 'Narokan',
	timeout: 60000,
	use: {
		baseURL: 'https://dev.narokan.com',
		viewport: { width: 1280, height: 720 }
	},
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test)\.ts/
};

export default config;
