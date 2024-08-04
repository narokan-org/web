import { isProduction } from '$lib/utils/utils';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

export class TelemetryService {
	private appInsights: ApplicationInsights;

	constructor() {
		this.appInsights = new ApplicationInsights({
			config: {
				enableDebug: !isProduction(),
				instrumentationKey: process.env.APPLICATION_INSIGHTS_INSTRUMENTATION_KEY
			}
		});

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
