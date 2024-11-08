import axios from "axios";
import {
  getNewAccessToken,
  getLocalAccessToken,
  getLocalRefreshToken,
  isAccessTokenExpired,
} from "../utils";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "content-type": "application/json",
  },
});

// Hanlde refresh token and access token ...
let refreshTokenRequest = null;
axiosClient.interceptors.request.use(
  async (config) => {
    // Check if the config have authorization field
    if (config.headers.authorization) {
      const refreshToken = getLocalRefreshToken();

      if (isAccessTokenExpired()) {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : getNewAccessToken(refreshToken);

        const newAccessToken = await refreshTokenRequest;
        refreshTokenRequest = null;
        localStorage.setItem("accessToken", newAccessToken);
      }

      config = {
        ...config,
        headers: {
          ...config.headers,
          authorization: "Bear " + getLocalAccessToken(),
        },
      };
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
  },
  (err) => {
    throw err;
  }
);

export default axiosClient;
