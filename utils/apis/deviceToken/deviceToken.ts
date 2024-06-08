import { axiosErrorHandler } from '../axiosInstance/axiosErrorHandler';
import axiosInstance from '../axiosInstance/axiosInstance';

// Function to update device token
export const updateDeviceToken = async (
	deviceToken: DeviceTokenCreateRequest
) => {
	try {
		const response = await axiosInstance.put('/api/device-token', deviceToken);

		return response.data;
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};

// Function to create device token
export const createDeviceToken = async (
	deviceToken: DeviceTokenUpdateRequest
) => {
	try {
		const response = await axiosInstance.post('/api/device-token', deviceToken);

		return response.data;
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};
