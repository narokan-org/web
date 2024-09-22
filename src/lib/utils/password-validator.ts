interface PasswordValidationResult {
	isValid: boolean;
	error?: string;
}

export function validatePassword(password: string): PasswordValidationResult {
	if (password.length < 8 || password.length > 64) {
		return { isValid: false, error: 'Password must be between 8 and 64 characters long.' };
	}

	let hasLowerCase = false;
	let hasUpperCase = false;
	let hasNumber = false;
	let hasSymbol = false;

	for (const char of password) {
		if (char >= 'a' && char <= 'z') hasLowerCase = true;
		else if (char >= 'A' && char <= 'Z') hasUpperCase = true;
		else if (char >= '0' && char <= '9') hasNumber = true;
		else hasSymbol = true;
	}

	const satisfiedCategories = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol].filter(
		Boolean
	).length;

	if (satisfiedCategories < 3) {
		return {
			isValid: false,
			error:
				'Password must contain at least 3 of the following: lowercase letters, uppercase letters, numbers, and symbols.'
		};
	}

	return { isValid: true };
}
