import type { Environment } from '$lib/common/models/environment';

export function currentEnvironment(): Environment {
	const env = process.env.NODE_ENV;

	if (env === 'production' || env === 'local' || env === 'development') {
		return env;
	}

	throw new Error(`Invalid environment: ${env}`);
}

export async function parseDBResponse<T>(response: Response): Promise<T[] | null> {
	const jsonResponse = await response.json();
	if (!jsonResponse.value || !Array.isArray(jsonResponse.value)) {
		return null;
	}

	return jsonResponse.value as T[];
}

export function isOnboardingPath(path: string) {
	const onboardingPaths = ['/onboarding', '/invite'];
	return onboardingPaths.includes(path);
}
