import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://api.payup.turtlebyte.in/",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers["Authorization"] = `Bearer ${bearer}`;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosInstance;
