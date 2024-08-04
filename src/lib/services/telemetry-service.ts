import { isProduction } from '$lib/utils/utils';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

export class TelemetryService {
	private appInsights: ApplicationInsights;

	constructor() {
		console.log('inside constructor of telemetry service');
		this.appInsights = new ApplicationInsights({
			config: {
				enableDebug: !isProduction(),
				connectionString: process.env.APPLICATION_INSIGHTS_CONNECTION_STRING
			}
		});

		console.log('Getting ready to load app insights');
		this.appInsights.loadAppInsights();
		console.log('TelemetryService initialized');
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
