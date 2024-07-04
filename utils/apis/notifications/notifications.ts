import AxiosInstance from "../axiosInstance/axiosInstance";
import { axiosErrorHandler } from "../axiosInstance/axiosErrorHandler";

export const setNotificationPreferences = async (
  preferences: NotificationPreference,
): Promise<NotificationPreference | undefined> => {
  try {
    const response = await AxiosInstance.post(
      "/api/notification/preferences",
      preferences,
    );

    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};

export const getNotificationPreferences = async (): Promise<
  NotificationPreference | undefined
> => {
  try {
    const response = await AxiosInstance.get("/api/notification/preferences");

    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};
