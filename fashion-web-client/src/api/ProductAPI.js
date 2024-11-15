import axiosClient from "./axiosClient";

class ProductApi {
    // Lấy danh sách sản phẩm với các tùy chọn sắp xếp, giới hạn, và bỏ qua
    async getProducts(_sortBy, _limit, _skip) {
        try {
            const params = { _sortBy, _limit, _skip };
            const url = '/product/get';
            const response = await axiosClient.get(url, { params });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            throw error;
        }
    }

    // Lấy sản phẩm theo ID
    async getProductById(_id) {
        try {
            const url = `/product/${_id}/get`;
            const response = await axiosClient.get(url);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm theo ID:", error);
            throw error;
        }
    }

    // Lấy tổng số sản phẩm
    async getTotalProducts() {
        try {
            const url = '/product/getTotalProducts';
            const response = await axiosClient.get(url);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy tổng số sản phẩm:", error);
            throw error;
        }
    }
}

const productApi = new ProductApi();
export default productApi;
