import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LoggingService } from './logging-service';

describe('LoggingService', () => {
	let loggingService: LoggingService;

	beforeEach(() => {
		loggingService = new LoggingService();
		vi.spyOn(console, 'log').mockImplementation(() => {});
		vi.spyOn(console, 'error').mockImplementation(() => {});
		vi.spyOn(console, 'warn').mockImplementation(() => {});
		vi.spyOn(console, 'debug').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should log with timestamp', () => {
		const message = 'Info message';
		process.env.NODE_ENV = 'development';
		loggingService.info(message);

		const timestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
		expect(console.log).toHaveBeenCalledWith(expect.stringMatching(timestampRegex));
	});

	it('should not log with timestamp in production', () => {
		const message = 'Info message';
		process.env.NODE_ENV = 'production';
		loggingService.info(message);

		const timestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
		expect(console.log).toHaveBeenCalledWith(expect.not.stringMatching(timestampRegex));
	});

	it('should log with tag', () => {
		const message = 'Info message';

		loggingService.info(message);

		expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[Basel]'));
	});

	it('should log info messages correctly', () => {
		const message = 'Info message';

		loggingService.info(message);

		expect(console.log).toHaveBeenCalledWith(expect.stringContaining('INFO: Info message'));
	});

	it('should log error messages correctly', () => {
		const message = 'Error message';

		loggingService.error(message);

		expect(console.error).toHaveBeenCalledWith(expect.stringContaining('ERROR: Error message'));
	});

	it('should log warn messages correctly', () => {
		const message = 'Warn message';

		loggingService.warn(message);

		expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('WARN: Warn message'));
	});

	it('should log debug messages correctly', () => {
		const message = 'Debug message';

		loggingService.debug(message);

		expect(console.debug).toHaveBeenCalledWith(expect.stringContaining('DEBUG: Debug message'));
	});

	it('should format object messages correctly', () => {
		const message = { key: 'value' };

		loggingService.info(message);

		expect(console.log).toHaveBeenCalledWith(expect.stringContaining('INFO: {"key":"value"}'));
	});
});
