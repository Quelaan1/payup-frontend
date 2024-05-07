import axios, { AxiosError } from 'axios';
import { getValueFromSecureStoreAsync } from '../../expo-store/expo-store';
import MockAdapter from 'axios-mock-adapter';

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_URL,
	// baseURL: 'https://api.payup.turtlebyte.in/',
});

if (process.env.EXPO_PUBLIC_MOCK_AXIOS === 'true') {
	const mock = new MockAdapter(axiosInstance);

	const delay = 3000; // Delay set to 3000 milliseconds (3 seconds)

	// Mock for sending OTP
	mock.onPost('api/auth/otp').reply((config) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const { phone_number } = JSON.parse(config.data);
				if (phone_number.length === 10 && phone_number === '8660312110') {
					resolve([200, { message: 'OTP sent successfully.' }]);
				} else {
					resolve([400, { message: 'Invalid phone number.' }]);
				}
			}, delay);
		});
	});

	// Store OTP for validation
	const otpStore: Record<string, string> = {
		'8660312110': '123456',
	};

	// Mock for verifying OTP
	mock.onPost('api/auth/verify/otp/').reply((config) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const { phone_number, pin } = JSON.parse(config.data);
				const correctOtp = otpStore[phone_number];
				console.log('Correct OTP:', correctOtp, 'Received OTP:', pin);
				if (pin === correctOtp) {
					resolve([
						200,
						{
							message: 'OTP verified successfully.',
							access_token: 'dummy_access_token',
							refresh_token: 'dummy_refresh_token',
						},
					]);
				} else {
					resolve([400, { message: 'Invalid OTP.' }]);
				}
			}, delay);
		});
	});

	// Mock for sending Aadhaar OTP
	mock.onPost('api/kyc/aadhaar/otp').reply((config) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const data = JSON.parse(config.data);
				const ref_id = 'ref' + new Date().getTime();
				resolve([200, { message: 'Aadhaar OTP sent.', ref_id: ref_id }]);
			}, delay);
		});
	});

	// Mock for verifying Aadhaar OTP
	mock.onPost('api/kyc/aadhaar/verify').reply((config) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const { entity_id, otp, ref_id } = JSON.parse(config.data);
				resolve([
					200,
					{
						id: '123',
						email: 'test@example.com',
						name: 'John Doe',
						onboarded: true,
						kyc_complete: true,
						kyc_pan: true,
						kyc_uidai: true,
						status: 200,
					},
				]);
			}, delay);
		});
	});

	// Mock for verifying PAN
	mock.onPost('api/kyc/pan/verify').reply((config) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const { entity_id, entity_type, dob, name, consent } = JSON.parse(
					config.data
				);
				if (
					consent === 'y' &&
					entity_type === 1 &&
					entity_id === 'BINPT2390C'
				) {
					resolve([
						200,
						{
							entity_name: name,
							internal_id: '12345',
							name_as_per_pan_match: name === 'TILAK',
							date_of_birth_match: dob === '04/04/1999',
							status: 200,
						},
					]);
				} else if (entity_id === 'BINPT2390') {
					resolve([400, { message: 'Invalid PAN' }]);
				} else {
					resolve([422, { message: 'Invalid PAN' }]);
				}
			}, delay);
		});
	});

	// Mock for getting profile
	mock.onGet(`api/profile/`).reply(() => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([
					200,
					{
						id: '123',
						email: 'john.doe@example.com',
						name: 'John Doe',
						onboarded: false,
						kyc_complete: false,
						kyc_pan: false,
						kyc_uidai: false,
					},
				]);
			}, delay);
		});
	});

	// Mock for updating profile
	mock.onPut(`api/profile/123`).reply((config) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const { email, name } = JSON.parse(config.data);
				resolve([
					200,
					{
						id: '123',
						email: email,
						name: name,
						onboarded: true,
						kyc_complete: true,
						kyc_pan: true,
						kyc_uidai: true,
					},
				]);
			}, delay);
		});
	});
}

// Request interceptor
axiosInstance.interceptors.request.use(
	async (config) => {
		const access_token = await getValueFromSecureStoreAsync('access_token');

		const url = config.url || '';

		if (url !== 'api/auth/otp' && url !== 'api/auth/verify/otp') {
			config.headers['Authorization'] = `Bearer ${access_token}`;
			config.headers['Content-Type'] = 'application/json';
		}

		console.log('Request interceptor', config);

		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data

		console.log('Response interceptor', response);

		return response;
	},
	(error) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error

		const err = error as AxiosError;

		// Check if response and data are defined
		if (err.response && err.response.data) {
			const errorData = err.response.data as { message: string };
			const message = errorData.message;

			// console.error('Response error interceptor', message);
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
