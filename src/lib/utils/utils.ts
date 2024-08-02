export const isProduction = () => process.env.NODE_ENV === 'production';

export async function parseDBResponse<T>(response: Response): Promise<T[] | null> {
	const jsonResponse = await response.json();
	if (!jsonResponse.value || !Array.isArray(jsonResponse.value)) {
		return null;
	}

	return jsonResponse.value as T[];
}
