import { handleErrors } from "@/utils/handleErrors";
import axios from "axios";
import Cookies from "js-cookie";

const accessTokenExpiration = new Date();
accessTokenExpiration.setTime(accessTokenExpiration.getTime() + 30 * 60 * 1000); // expires in 30mins
export { accessTokenExpiration };

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request interceptor to include the latest access token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("session_id");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let counter: number = 0;

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error status is 401 or a specific status indicating token expiration
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        counter++;
        if (counter >= 4)
          throw new Error("Failed to refresh token after 3 attempts");

        const refreshToken = Cookies.get("session_id_ref");

        const response = await api.post("/token", { refreshToken });
        const newAccessToken = response.data.accessToken;
        const newExpiration = new Date();
        newExpiration.setTime(newExpiration.getTime() + 30 * 60 * 1000);

        Cookies.set("session_id", newAccessToken, {
          secure: true,
          sameSite: "strict",
          expires: newExpiration,
        });

        // Update the Authorization header with the new token
        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        counter = 0; // Reset the counter for the next retry attempt

        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        handleErrors(refreshError);
        return Promise.reject(refreshError);
      }
    }

    handleErrors(error);
    return Promise.reject(error);
  },
);

export default api;
