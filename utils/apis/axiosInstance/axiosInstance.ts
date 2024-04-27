import axios from 'axios';
import { getValueFromSecureStoreAsync } from '../../expo-store/expo-store';

// const access_token = getValueFromSecureStore("access_token");

// Create an Axios instance
const axiosInstance = axios.create({
	// baseURL: 'https://api.payup.turtlebyte.in/',
	baseURL: 'http://192.168.1.8:8000/',
});

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
		return response;
	},
	(error) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default axiosInstance;
