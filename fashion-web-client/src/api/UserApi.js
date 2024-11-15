import { createConfigWithToken } from '../utils';
import axiosClient from './axiosClient';

class UserApi {
    constructor() {
        this.basePath = `${process.env.REACT_APP_API_SERVER_URL}/user`;
    }

    // Phương thức đăng nhập người dùng
    async login(username, password) {
        try {
        const data = { username, password };
        const response = await axiosClient.post(`${this.basePath}/login`, data);
        const { accessToken, refreshToken } = response.data;

        // Lưu token vào localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
        } catch (error) {
        console.error('Đăng nhập thất bại:', error);
        throw error;
        }
    }

    // Phương thức đăng xuất người dùng
    async logout(username) {
        try {
        const data = { username };
        const response = await axiosClient.post(`${this.basePath}/logout`, data);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return response.data;
        } catch (error) {
        console.error('Đăng xuất thất bại:', error);
        throw error;
        }
    }

    // Phương thức cập nhật vị trí người dùng
    async updateLocation(username, location) {
        try {
        const config = createConfigWithToken();
        const data = { username, location };
        const response = await axiosClient.post(
            `${this.basePath}/updateLocation`,
            data,
            config
        );
        return response.data;
        } catch (error) {
        console.error('Cập nhật vị trí thất bại:', error);
        throw error;
        }
    }
}

const userApi = new UserApi();
export default userApi;
