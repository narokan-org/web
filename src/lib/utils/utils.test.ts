import { describe, it, expect, beforeEach } from 'vitest';
import { isProduction } from './utils';

describe('utils', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'production';
	});

	it('should return true for production', () => {
		expect(isProduction()).toBe(true);
	});

	it('should return false for non-production', () => {
		process.env.NODE_ENV = 'development';
		expect(isProduction()).toBe(false);
	});
});
