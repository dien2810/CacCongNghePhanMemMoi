import Carousel from "react-grid-carousel";
import "../../../assets/css/BestSeller.css";
import BestSellerItem from "./Item";
import { useId, useState, useEffect } from "react";
import { clientAPI } from "../../../api/RestClient";
function BestSeller() {
  const id = useId();
  const [items, setItems] = useState([]);

  useEffect(() => {
    clientAPI.path = "/products";
    clientAPI
      .find({ sortBy: "hot", limit: 10, skip: 0 })
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => console.log(err));
    // productApi
    //   .getProducts("hot", 10, 0)
    //   .then((response) => setItems(response))
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <section className="bestseller">
      <div className="container-1139 bestseller-container">
        <div className="container-1139 bestseller-content-container">
          <h2 className="bestseller-heading">Best Seller Product</h2>
          <p className="bestseller-desc">
            Phong cách của bạn, dấu ấn của chúng tôi
          </p>
          <button className="button seemore-button">SEE MORE</button>
        </div>
        <Carousel
          cols={2}
          loop
          showDots={true}
          hideArrow={true}
          containerStyle={{ maxWidth: "70.952%" }}
          gap={14.7}
        >
          {items.map((item) => (
            <Carousel.Item key={id}>
              <BestSellerItem item={item} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
export default BestSeller;
