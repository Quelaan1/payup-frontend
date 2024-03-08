import axios from "axios";
import Constants from "expo-constants";
export const sendOTP = async (
  phone_number: string,
): Promise<SendOTPResponse> => {
  const { expoConfig } = Constants;

  const uri = `http://${
    expoConfig?.hostUri && expoConfig?.hostUri.split(":").shift()
  }:8000`;

  console.log(uri);

  try {
    return await axios
      .post(`${uri}/api/otp`, {
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
