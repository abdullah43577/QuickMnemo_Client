import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

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
        if (counter >= 4) {
          throw new Error("Failed to refresh token after 3 attempts");
        }
        await api.post("/token");

        counter = 0; // Reset the counter for the next retry attempt

        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
