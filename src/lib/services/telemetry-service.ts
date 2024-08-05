import { isProduction } from '$lib/utils/utils';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import type { LoggingService } from './logging-service';

export class TelemetryService {
	private appInsights: ApplicationInsights;

	constructor(private log: LoggingService) {
		this.appInsights = new ApplicationInsights({
			config: {
				enableDebug: !isProduction(),
				connectionString: process.env.APPLICATION_INSIGHTS_CONNECTION_STRING
			}
		});

		this.appInsights.loadAppInsights();
		this.log.debug('Application Insights initialized');
	}

	trackEvent(eventName: string, properties?: { [key: string]: string }) {
		this.appInsights.trackEvent({ name: eventName }, properties);
	}

	trackPageView(name?: string, uri?: string) {
		this.appInsights.trackPageView({ name, uri });
	}

	trackException(exception: Error) {
		this.appInsights.trackException({ exception });
	}

	trackMetric(name: string, average: number, properties?: { [key: string]: string }) {
		this.appInsights.trackMetric({ name, average }, properties);
	}
}
