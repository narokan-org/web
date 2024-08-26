import { isProduction } from '$lib/utils/utils';

type LogMessage = string | object;

export class LoggingService {
	#tag = '[Narokan]';

	private getTimestamp(): string {
		return isProduction()
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
		console.log(`${this.getTimestamp()} ${this.#tag} INFO: ${this.formatMessage(message)}`.trim());
	}

	error(message: LogMessage) {
		console.error(
			`${this.getTimestamp()} ${this.#tag} ERROR: ${this.formatMessage(message)}`.trim()
		);
	}

	warn(message: LogMessage) {
		console.warn(`${this.getTimestamp()} ${this.#tag} WARN: ${this.formatMessage(message)}`.trim());
	}

	debug(message: LogMessage) {
		console.debug(
			`${this.getTimestamp()} ${this.#tag} DEBUG: ${this.formatMessage(message)}`.trim()
		);
	}
}
