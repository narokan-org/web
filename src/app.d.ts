/// <reference types="svelte-adapter-azure-swa" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userService: import('$lib/services/user-service');
			telemetryService: import('$lib/services/telemetry-service');
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
