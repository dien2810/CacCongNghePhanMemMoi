import { formatCash } from "../../utils";
import {
  faTruckFast,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { itemsSlice } from "../../redux/slice/ItemsSlice";

function Item(props) {
  const item = props.item;
  const setDeleteItem = props.setDeleteItem;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const priceAfterDiscount = item.price - item.price * item.discount;

  // Cập nhật số lượng
  const changeQuantity = (value = 0) => {
    let temp = quantity + value;

    if (temp > item.stockQuantity || temp < 0) {
      return;
    }

    if (temp === 0) {
      setDeleteItem(item); // Mở popup xóa
      return;
    }

    setQuantity(temp);

    dispatch(
      itemsSlice.actions.userItemsUpdateQuantity({
        itemId: item.itemId,
        quantity: temp,
        shipFee: 1000, // Cập nhật phí ship (nếu cần)
      })
    );
  };

  return (
    <div className="cart-page-item">
      <div className="cart-page-item-shop-container">
        <div>Mall</div>
        <p>Nhóm 06</p>
      </div>
      <div style={{ padding: "0 20px", width: "100%" }}>
        <div className="cart-page-item-infor-container">
          <div className="flex-center" style={{ width: "46.27949%" }}>
            <img src={item.image} alt="cart-page-item" />
            <div
              className="flex-start"
              style={{ height: "88px", width: "80%", flexDirection: "column" }}
            >
              <h2>{item.productName}</h2>
              <div
                className="flex-start"
                style={{ gap: "0 5px", padding: "0 5px" }}
              >
                <FontAwesomeIcon
                  icon={faArrowTrendDown}
                  style={{ color: "var(--red-color)" }}
                />
                <p>{Math.round(item.discount * 100)}%</p>
              </div>
            </div>
            <div className="cart-page-category-select">
              <p>
                Phân Loại Hàng: <button></button>
              </p>
              <div>
                {item.color}, {item.size}
              </div>
            </div>
          </div>
          <div
            className="flex-center"
            style={{ width: "15.4265%", flexDirection: "column" }}
          >
            <p className="price">{formatCash(item.price)}đ</p>
            <p className="discountprice">{formatCash(priceAfterDiscount)}đ</p>
          </div>
          <div className="flex-center" style={{ width: "15.4265%" }}>
            <div className="container-item quatity" style={{ width: "80%" }}>
              <div
                className="quatity-item"
                style={{
                  width: "25%",
                  borderRight: "1px solid rgba(0,0,0,.09)",
                  cursor: "pointer",
                }}
                onClick={() => changeQuantity(-1)}
              >
                -
              </div>
              <div
                className="quatity-item"
                style={{
                  width: "50%",
                  borderRight: "1px solid rgba(0,0,0,.09)",
                }}
              >
                {item.quantity}
              </div>
              <div
                className="quatity-item"
                style={{ width: "25%", cursor: "pointer" }}
                onClick={() => changeQuantity(1)}
              >
                +
              </div>
            </div>
          </div>
          <div
            className="flex-center"
            style={{
              width: "10.43557%",
              fontSize: "14px",
              color: "var(--red-color)",
            }}
          >
            {formatCash(quantity * priceAfterDiscount)}đ
          </div>
          <div
            className="flex-center"
            style={{ width: "12.70417%", fontSize: "14px", cursor: "pointer" }}
            onClick={() => setDeleteItem(item)}
          >
            Xóa
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
