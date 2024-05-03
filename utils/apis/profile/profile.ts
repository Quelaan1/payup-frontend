import axiosInstance from '../axiosInstance/axiosInstance';

export const getProfile = async (): Promise<GetProfileResponse> => {
	try {
		return await axiosInstance.get(`api/profile/`).then((response) => {
			return response.data;
		});
	} catch (error) {
		console.error(error);

		throw 'Error getting profile. Please try again';
	}
};

export const updateProfile = async ({
	id,
	email,
	name,
}: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
	try {
		return await axiosInstance
			.put(`api/profile/${id}`, {
				email,
				name,
			})
			.then((response) => {
				return response.data;
			});
	} catch (error) {
		console.error(error);

		throw 'Error updating profile. Please try again';
	}
};
