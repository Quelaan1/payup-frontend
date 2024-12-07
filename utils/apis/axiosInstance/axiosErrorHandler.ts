import { AxiosError } from 'axios';

export const axiosErrorHandler = (error: any) => {
	const err = error as AxiosError;

	// Check if response and data are defined
	if (err.response && err.response.data) {
		const errorData = err.response.data as { message: string };
		const message = errorData.message;

		throw message;
	} else {
		// If response or data is undefined, throw a generic error message
		throw 'An unexpected error occurred. Please try again later.';
	}
};
