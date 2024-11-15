import Carousel from "react-grid-carousel";
import OurProductItem from "./Item";
import Pagnition from "./Pagnition";
import Tab from "./Tab";
import "../../../assets/css/OurProduct.css";
import { useState, useId, useEffect } from "react";
import { clientAPI } from "../../../api/RestClient";

function OurProduct() {
  const id = useId();
  const [items, setItems] = useState([]);
  const [pag, setPag] = useState({ start: 0, step: 3, tab: "hot" });

  useEffect(() => {
    clientAPI.path = "/products";
    clientAPI
      .find({ _sortBy: pag.tab, _limit: pag.step, _skip: pag.start })
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => console.log(err));
  }, [pag]);

  function changeTab(tab) {
    setPag({ ...pag, start: 0, tab: tab });
  }

  return (
    <section>
      <div className="container-1139 ourproduct-container">
        <h2 className="ourpoduct-heading">Our Product</h2>
        <Tab changeTab={changeTab} />
        <Carousel rows={15} cols={4} hideArrow={true}>
          {items.map((item) => (
            <Carousel.Item key={id}>
              <OurProductItem item={item} />
            </Carousel.Item>
          ))}
        </Carousel>
        <Pagnition pag={pag} setPag={setPag} />
      </div>
    </section>
  );
}
export default OurProduct;
