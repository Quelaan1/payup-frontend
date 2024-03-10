import axios from "axios";
import Constants from "expo-constants";

const { expoConfig } = Constants;

const uri = `http://${
  expoConfig?.hostUri && expoConfig?.hostUri.split(":").shift()
}:8000`;

export const sendOTP = async (
  phone_number: string,
): Promise<SendOTPResponse> => {
  try {
    return await axios
      .post(`${uri}/api/auth/otp`, {
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
    return await axios
      .post(`${uri}/api/auth/verify/otp`, {
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
