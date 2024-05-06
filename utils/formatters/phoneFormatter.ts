export function extractPhoneNumber(phone: string): string {
	// Remove all non-digit characters from the string
	const digitsOnly = phone.replace(/\D+/g, '');

	// Assuming all phone numbers are 10 digits long after the country code
	// and the country code is variable in length (commonly the numbers are 10 digits in many countries including India)
	return digitsOnly.length > 10 ? digitsOnly.slice(-10) : digitsOnly;
}
