import axiosInstance from '../axiosInstance/axiosInstance';

export const verifyPan = async ({
	entity_id,
	entity_type,
	dob,
	name,
	consent,
}: VerifyPanRequest): Promise<VerifyPanResponse> => {
	try {
		const data: VerifyPanRequest = {
			entity_id,
			entity_type,
			dob,
			name,
			consent,
		};

		const response = await axiosInstance.post('/api/kyc/pan/verify', data);

		return { ...response.data, status: response.status };
	} catch (error) {
		throw error;
	}
};
