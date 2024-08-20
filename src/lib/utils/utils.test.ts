import { describe, it, expect, beforeEach } from 'vitest';
import { isOnboardingPath, isProduction } from './utils';

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

	it('should return false for path not an onboarding path', () => {
		expect(isOnboardingPath('/inbox')).toBe(false);
	});

	it('should return true for path on /onboarding path', () => {
		expect(isOnboardingPath('/onboarding')).toBe(true);
	});

	it('should return true for path on /invite path', () => {
		expect(isOnboardingPath('/invite')).toBe(true);
	});
});
