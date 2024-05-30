import axiosInstance from '../axiosInstance/axiosInstance';
import {axiosErrorHandler} from '../axiosInstance/axiosErrorHandler';
import {GetPromotionsResponse} from '../../../types/apis/promotions/promotions';

export const getPromotions = async (): Promise<GetPromotionsResponse> => {
	try {
		return await axiosInstance.get(`api/promotion`).then((response) => {
			return response.data;
		});
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};
