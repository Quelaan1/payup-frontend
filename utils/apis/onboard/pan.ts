import axiosInstance from '../axiosInstance/axiosInstance';

export const verifyPan = async ({
	entity_id,
	entity_type,
}: VerifyPanRequest): Promise<VerifyPanResponse> => {
	try {
		const data: VerifyPanRequest = {
			entity_id,
			entity_type,
		};

		const response = await axiosInstance.post('/api/kyc/pan/verify', data);
		return response.data;
	} catch (error) {
		throw 'Error while verifying PAN';
	}
};

export const createPan = async ({
	entity_id,
	entity_type,
	entity_name,
	internal_id,
}: CreatePanRequest) => {
	try {
		const data: CreatePanRequest = {
			entity_id,
			entity_type,
			entity_name,
			internal_id,
		};

		const response = await axiosInstance.post('/api/kyc/pan', data);
		return response.data;
	} catch (error) {
		throw 'Error while creating PAN record';
	}
};
