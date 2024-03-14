import axiosInstance from "../axiosInstance/axiosInstance";

export const sendOTP = async (
  phone_number: string,
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
    console.error(error);

    throw error;
  }
};

export const verifyOTP = async (
  phone_number: string,
  otp: string,
): Promise<SendOTPResponse> => {
  try {
    return await axiosInstance
      .post(`api/auth/verify/otp`, {
        phone_number: phone_number,
        otp: otp,
      })
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    console.error(error);

    throw error;
  }
};
