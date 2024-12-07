import { axiosErrorHandler } from '../axiosInstance/axiosErrorHandler';
import axiosInstance from '../axiosInstance/axiosInstance';

// Function to update a device
export const updateDeviceLastUsed = async (deviceId: string) => {
	try {
		const response = await axiosInstance.put(`/api/devices/${deviceId}`);
		return response.data;
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};

// Function to register a new device
export const registerDevice = async (deviceData: Device) => {
	try {
		const response = await axiosInstance.post('/api/devices/', deviceData);
		return response.data;
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};

// Function to get all devices
export const getAllDevices = async (): Promise<Device[]> => {
	try {
		const response = await axiosInstance.get('/api/devices/');
		return response.data.Devices;
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};

// Function to delete a device
export const deleteDevice = async (deviceId: string) => {
	try {
		const response = await axiosInstance.delete(`/api/devices/${deviceId}`);
		return response.data.message;
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};

// Function to delete all devices
export const deleteAllDevices = async () => {
	try {
		const response = await axiosInstance.delete(`/api/devices/`);

		return response.data.message;
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};
