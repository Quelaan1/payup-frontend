import axiosInstance from '../axiosInstance/axiosInstance';
import { axiosErrorHandler } from '../axiosInstance/axiosErrorHandler';

export const sendOTP = async (
	phone_number: string
): Promise<SendOTPResponse> => {
	try {
		return await axiosInstance
			.post(`api/auth/otp`, {
				phone_number: phone_number,
			})
			.then((response) => {
				return response.data;
			});
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};

export const verifyOTP = async ({
	phoneNumber,
	otp,
}: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
	try {
		return await axiosInstance
			.post(
				`api/auth/verify/otp`,
				{
					phone_number: phoneNumber,
					pin: otp,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			)
			.then((response) => {
				return response.data;
			});
	} catch (error) {
		throw axiosErrorHandler(error);
	}
};
