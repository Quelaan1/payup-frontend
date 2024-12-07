import axios, { AxiosError } from "axios";
import { getValueFromSecureStoreAsync } from "../../expo-store/expo-store";
import { reloadAppAsync } from "expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistor, store } from "../../../redux/store";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token = await getValueFromSecureStoreAsync("access_token");

    const url = config.url || "";

    if (url !== "api/auth/otp" && url !== "api/auth/verify/otp") {
      config.headers["Authorization"] = `Bearer ${access_token}`;
      config.headers["Content-Type"] = "application/json";
    }

    console.log("Request interceptor", config);

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const err = error as AxiosError;

    if (err.response?.status === 401) {
      await persistor.purge();

      reloadAppAsync();
    }

    // Check if response and data are defined
    if (err.response && err.response.data) {
      const errorData = err.response.data as { message: string };
      const message = errorData.message;

      // console.error('Response error interceptor', message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
