import axiosClient from "./axiosClient";

//Class cua REST Client co nhung phuong thuc: authentication, reAuthentication(), find(query), create(data), get(Id), patch(id, data), remove(id), service(path)
class ProductApi {
  getProducts = async (sortBy, limit, skip) => {
    const params = { sortBy, limit, skip };
    const url = "/products";
    return axiosClient.get(url, { params });
  };

  getProductById = async (_id) => {
    const url = `/product/${_id}/get`;
    return axiosClient.get(url);
  };

  getTotalProducts = async () => {
    const url = "/product/getTotalProducts";
    return axiosClient.get(url);
  };
}

const productApi = new ProductApi();
export default productApi;
