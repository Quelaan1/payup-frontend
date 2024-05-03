import axiosInstance from '../axiosInstance/axiosInstance';

export async function sendAadhaarOtp(
	data: SendAadhaarOtpRequest
): Promise<SendAadhaarOtpResponse> {
	try {
		const response = await axiosInstance.post('/api/kyc/aadhaar/otp', data);

		return { ...response.data, status: response.status };
	} catch (error) {
		throw error;
	}
}

export async function verifyAadhaarOtp(
	data: VerifyAadhaarOtpRequest
): Promise<VerifyAadhaarOtpResponse> {
	try {
		const response = await axiosInstance.post('/api/kyc/aadhaar/verify', data);

		return { ...response.data, status: response.status };
	} catch (error) {
		throw error;
	}
}
