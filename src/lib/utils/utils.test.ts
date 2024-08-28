import { describe, it, expect, beforeEach } from 'vitest';
import { currentEnvironment, isOnboardingPath } from './utils';

describe('utils', () => {
	beforeEach(() => {
		process.env.NODE_ENV = 'production';
	});

	it('should return true for production', () => {
		expect(currentEnvironment() === 'production').toBe(true);
	});

	it('should return true for development', () => {
		process.env.NODE_ENV = 'development';
		expect(currentEnvironment() === 'development').toBe(true);
	});

	it('should return true for local', () => {
		process.env.NODE_ENV = 'local';
		expect(currentEnvironment() === 'local').toBe(true);
	});

	it('should return throw error for unrecognized environment', () => {
		process.env.NODE_ENV = 'unrecognized';
		expect(currentEnvironment).toThrowError('Invalid environment: unrecognized');
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
