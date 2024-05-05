export function createValidator(
	regex: RegExp,
	errorMessage: string
): (value: string) => boolean | string {
	return function (value: string): boolean | string {
		const result = regex.test(value);
		if (!result) {
			return errorMessage;
		}
		return result;
	};
}

// Validators
export const validateEmail = createValidator(
	/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
	'Invalid email, please enter a valid email address'
);

export const validatePAN = createValidator(
	/^[A-Z]{5}[0-9]{4}[A-Z]$/,
	'Invalid PAN, please enter a valid PAN number'
);

export const validatePhoneNumber = createValidator(
	/^[0-9]{10}$/,
	'Invalid phone number, please enter a valid phone number'
);

export const validateAadhaar = createValidator(
	/^[0-9]{12}$/,
	'Invalid Aadhaar, please enter a valid Aadhaar number'
);

export const validateAadhaarOtp = createValidator(
	/^[0-9]{6}$/,
	'OTP should be 6 digits'
);
