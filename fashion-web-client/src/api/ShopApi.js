import axiosClient from "./axiosClient";

class ShopApi {
    // Lấy vị trí của cửa hàng
    async getShopLocation() {
        try {
            const url = '/shop/location';
            const response = await axiosClient.get(url);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy vị trí cửa hàng:", error);
            throw error;
        }
    }
}

const shopApi = new ShopApi();
export default shopApi;
