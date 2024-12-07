import { axiosErrorHandler } from "../axiosInstance/axiosErrorHandler";
import axiosInstance from "../axiosInstance/axiosInstance";

export const initiatePayment = async (
  params: InitiatePaymentRequest
): Promise<InitiatePaymentResponse> => {
  try {
    const response = await axiosInstance.post(
      "/api/easebuzz/initiate-payment",
      params
    );

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};
