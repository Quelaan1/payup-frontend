import { axiosErrorHandler } from "../axiosInstance/axiosErrorHandler";
import axiosInstance from "../axiosInstance/axiosInstance";

export async function getPayees(): Promise<Payee[] | undefined> {
  try {
    const response = await axiosInstance.get("api/payees/");

    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
}

export async function deletePayee({
  payee_id,
}: DeletePayeeRequest): Promise<void> {
  try {
    console.log(payee_id);

    const response = await axiosInstance.delete(`api/payees/${payee_id}`);

    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
}

type AddPayeeRequest = AddPayeeRequestUpi | AddPayeeRequestBank;

export async function addPayee(payee: AddPayeeRequest): Promise<void> {
  try {
    const response = await axiosInstance.post("api/payees/", payee);

    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
}
