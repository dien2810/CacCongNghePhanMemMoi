import axiosClient from './axiosClient';
import { createConfigWithToken } from '../utils';

class CartApi {
    // Lấy giỏ hàng dựa trên tên người dùng
    async getCartByUsername(username) {
        try {
        const url = `/cart/${username}`;
        const config = createConfigWithToken();
        const response = await axiosClient.get(url, config);
        return response.data;
        } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        throw error;
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    async deleteProduct(username, itemId) {
        try {
        const url = '/cart/delete';
        const config = createConfigWithToken();
        const data = { username, itemId };
        const response = await axiosClient.post(url, data, config);
        return response.data;
        } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        throw error;
        }
    }

    // Thêm sản phẩm vào giỏ hàng
    async insertProduct(data) {
        try {
        const url = '/cart/put';
        const config = createConfigWithToken();
        const response = await axiosClient.post(url, data, config);
        return response.data;
        } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        throw error;
        }
    }

    // Đặt hàng từ giỏ hàng của người dùng
    async order(username, cart) {
        try {
        const url = '/cart/order';
        const data = { username, cart };
        const config = createConfigWithToken();
        const response = await axiosClient.post(url, data, config);
        return response.data;
        } catch (error) {
        console.error("Lỗi khi đặt hàng:", error);
        throw error;
        }
    }
}

const cartApi = new CartApi();
export default cartApi;
