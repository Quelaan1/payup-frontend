import axiosInstance from "../axiosInstance/axiosInstance";

export const verifyPan = async ({
  entity_id,
  entity_type,
}: VerifyPanRequest): Promise<VerifyPanResponse> => {
  try {
    const data: VerifyPanRequest = {
      entity_id,
      entity_type,
    };

    const response = await axiosInstance.post("/api/kyc/pan/verify", data);
    return response.data;
  } catch (error) {
    throw "Error while verifying PAN";
  }
};
