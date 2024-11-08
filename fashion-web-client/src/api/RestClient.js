// class RestClient {
//   path = "";

//   async config(url) {}
//   async authentication(strategy, email, password) {
//     //gui yeu cau xac thuc
//   }

//   async reAuthentication() {}
//   async find(query) {}
//   async create(data) {}
//   async get(objectId) {}
//   async patch(objectId, data) {}
//   async remove(objectId) {}
//   service(path) {
//     this.path = path;
//     return this;
//   }
// }
// var clientAPI = new RestClient();
// clientAPI.config("http://localhost:3030");
// export { clientAPI };
import axios from "axios";

class RestClient {
  constructor() {
    this.axiosInstance = null;
    this.path = "";
  }

  // Cấu hình client
  async config(baseURL, headers = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }

  // Xác thực và lấy token
  async authentication(strategy, email, password) {
    try {
      const response = await this.axiosInstance.post(`/auth`, {
        strategy,
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      return response.data;
    } catch (error) {
      console.error("Authentication failed:", error);
      throw error;
    }
  }

  // Tự động làm mới token khi hết hạn
  async reAuthentication() {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await this.axiosInstance.post(`/refresh-token`, {
        refreshToken,
      });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      return accessToken;
    } catch (error) {
      console.error("Re-authentication failed:", error);
      throw error;
    }
  }

  // Cấu hình dịch vụ API (endpoint)
  service(path) {
    this.path = path;
    return this;
  }

  // Gửi yêu cầu GET với query
  async find(query = {}) {
    try {
      const response = await this.axiosInstance.get(this.path, {
        params: query,
      });
      return response.data;
    } catch (error) {
      console.error("Error finding data:", error);
      throw error;
    }
  }

  // Gửi yêu cầu POST để tạo dữ liệu mới
  async create(data) {
    try {
      const response = await this.axiosInstance.post(this.path, data);
      return response.data;
    } catch (error) {
      console.error("Error creating data:", error);
      throw error;
    }
  }

  // Lấy một object qua ID
  async get(objectId) {
    try {
      const response = await this.axiosInstance.get(`${this.path}/${objectId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
  }

  // Cập nhật một object qua ID
  async patch(objectId, data) {
    try {
      const response = await this.axiosInstance.patch(
        `${this.path}/${objectId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error patching data:", error);
      throw error;
    }
  }

  // Xóa một object qua ID
  async remove(objectId) {
    try {
      const response = await this.axiosInstance.delete(
        `${this.path}/${objectId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error removing data:", error);
      throw error;
    }
  }
}

const clientAPI = new RestClient();
clientAPI.config("http://localhost:3000");
export { clientAPI };
