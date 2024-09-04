import { currentEnvironment } from '$lib/utils/utils';

type LogMessage = string | object;

export interface ILoggingService {
	info(message: LogMessage): void;
	error(message: LogMessage): void;
	warn(message: LogMessage): void;
	debug(message: LogMessage): void;
}

export class LoggingService implements ILoggingService {
	private tag = '[Narokan]';

	private getTimestamp(): string {
		return currentEnvironment() !== 'local'
			? ''
			: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
	}

	private formatMessage(message: LogMessage): string {
		if (typeof message === 'string') {
			return message;
		}

		return JSON.stringify(message);
	}

	info(message: LogMessage) {
		console.log(`${this.getTimestamp()} ${this.tag} INFO: ${this.formatMessage(message)}`.trim());
	}

	error(message: LogMessage) {
		console.error(
			`${this.getTimestamp()} ${this.tag} ERROR: ${this.formatMessage(message)}`.trim()
		);
	}

	warn(message: LogMessage) {
		console.warn(`${this.getTimestamp()} ${this.tag} WARN: ${this.formatMessage(message)}`.trim());
	}

	debug(message: LogMessage) {
		console.debug(
			`${this.getTimestamp()} ${this.tag} DEBUG: ${this.formatMessage(message)}`.trim()
		);
	}
}
