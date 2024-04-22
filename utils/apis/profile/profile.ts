import axiosInstance from "../axiosInstance/axiosInstance";

export const getProfile = async (): Promise<GetProfileResponse> => {
  try {
    return await axiosInstance.get(`api/profile`).then((response) => {
      return response.data;
    });
  } catch (error) {
    console.error(error);

    throw "Error getting profile. Please try again";
  }
};
