import { axiosErrorHandler } from '../axiosInstance/axiosErrorHandler';
import axiosInstance from '../axiosInstance/axiosInstance';

export async function getTransactions(): Promise<Transaction[] | undefined> {
	try {
		const response = await axiosInstance.get('api/transactions');

		return response.data;
	} catch (error) {
		axiosErrorHandler(error);
	}
}
