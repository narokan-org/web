/// <reference types="svelte-adapter-azure-swa" />
/// <reference types="@testing-library/jest-dom" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			loggingService: import('$lib/services/logging-service').LoggingService;
			userService: import('$lib/services/user-service').UserService;
			companyService: import('$lib/services/company-service').CompanyService;
			telemetryService: import('$lib/services/telemetry-service').TelemetryService;
			identityService: import('$lib/services/identity-service').IdentityService;
			assessmentService: import('$lib/services/assessment-service').AssessmentService;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
