type LogMessage = string | object;

export class LoggingService {
	#tag = '[Basel]';

	private getTimestamp(): string {
		return new Date().toISOString();
	}

	private formatMessage(message: LogMessage): string {
		if (typeof message === 'string') {
			return message;
		}

		return JSON.stringify(message);
	}

	info(message: LogMessage) {
		console.log(`${this.getTimestamp()} ${this.#tag} INFO: ${this.formatMessage(message)}`);
	}

	error(message: LogMessage) {
		console.error(`${this.getTimestamp()} ${this.#tag} ERROR: ${this.formatMessage(message)}`);
	}

	warn(message: LogMessage) {
		console.warn(`${this.getTimestamp()} ${this.#tag} WARN: ${this.formatMessage(message)}`);
	}

	debug(message: LogMessage) {
		console.debug(`${this.getTimestamp()} ${this.#tag} DEBUG: ${this.formatMessage(message)}`);
	}
}
