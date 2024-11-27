import Vecto from "../../../components/Vecto";
import { useId, useEffect, useState } from "react";
import "../../../assets/css/NewCollection.css";
import Carousel from "react-grid-carousel";
import { clientAPI } from "../../../api/RestClient.js";
import NewCollectionItem from "./Item.jsx";
function NewCollection() {
  const vecto = { top: "90%", left: "102%" };
  const id = useId();
  const [items, setItems] = useState([]);

  useEffect(() => {
    clientAPI.path = "/products";
    clientAPI
      .find({ sortBy: "new", limit: 3, skip: 0 })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setItems(response.data); // Chỉ set dữ liệu nếu nó là một mảng
        } else {
          console.error("Dữ liệu trả về không hợp lệ:", response.data);
          setItems([]); // Gán giá trị mặc định
        }
      })
      .catch((err) => console.error("Lỗi khi gọi API:", err));
  }, []);
  
  
  return (
    <div className="container-1139 newcollection-container">
      <div className="heading">New Collection</div>
      <p className="desc">
        Mỗi sản phẩm trong bộ sưu tập đều có sự phối hợp hài hòa giữa phong cách
        hiện đại và sự tinh tế trong từng chi tiết, giúp người dùng dễ dàng kết
        hợp và tạo nên những bộ trang phục nổi bật, tự tin thể hiện cá tính
        riêng.
      </p>
      <Carousel cols={3} loop hideArrow={true}>
        {items.map((item) => (
          <Carousel.Item key={id}>
            {<NewCollectionItem item={item} />}
          </Carousel.Item>
        ))}
      </Carousel>
      <Vecto style={vecto} />
      <div className="decorate-1"></div>
    </div>
  );
}
export default NewCollection;
