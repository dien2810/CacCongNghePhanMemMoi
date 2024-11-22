import "../../assets/css/PurchasedTotal.css";
import { formatCash, distance } from "../../utils/index";
import { itemsSlice } from "../../redux/slice/ItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getItemsInCart } from "../../redux/selectors";
import SuccessPopup from "../../components/Popup/SuccessPopup";
import ErrorPopup from "../../components/Popup/ErrorPopup";
import Loading from "../../components/Loading";
import { useState } from "react";
import { clientAPI } from "../../api/RestClient";

function Total() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const cart = useSelector(getItemsInCart);
  const shopLocation = JSON.parse(localStorage.getItem("shopLocation")) || {
    location: { lat: 0, lng: 0 },
  };
  const [state, setState] = useState({
    state: "init",
    message: "",
    closePopup: "",
  });

  // Lấy dữ liệu location an toàn
  const userLocation = user?.location?.location || { lat: 0, lng: 0 };
  const shopLocationData = shopLocation?.location || { lat: 0, lng: 0 };

  const distanceBetween2Point = Math.round(
    distance(
      userLocation.lat,
      userLocation.lng,
      shopLocationData.lat,
      shopLocationData.lng
    )
  );

  let totalItemPrice = 0;
  let total = 0;
  const totalShipFee = distanceBetween2Point * 5000;

  cart.forEach((item) => {
    const priceAfterDiscount = item.price * (1 - item.discount) * item.quantity;
    totalItemPrice += priceAfterDiscount;
    if (item.shipFee) total += item.shipFee + priceAfterDiscount;
    else total += priceAfterDiscount;
  });

  const closePopup = () => setState({ ...state, state: "init" });

  const order = async () => {
    setState({ ...state, state: "loading", closePopup: () => true });

    try {
      // Gọi API tạo đơn hàng
      await clientAPI.service("/orders").create({
        username: user.username,
        items: cart,
      });

      // Lấy lại danh sách giỏ hàng sau khi đặt hàng
      const updatedCart = await clientAPI
        .service("/cart")
        .find({ username: user.username });
      dispatch(itemsSlice.actions.setUserItems(updatedCart));

      setState({
        ...state,
        state: "success",
        message: "Đặt hàng thành công!",
        closePopup: closePopup,
      });
    } catch (err) {
      console.error("Error placing order:", err);
      setState({
        ...state,
        state: "error",
        message: "Đặt hàng thất bại. Vui lòng thử lại.",
        closePopup: closePopup,
      });
    }
  };

  return (
    <div
      className="container-1056 purchase-method"
      style={{ backgroundColor: "white" }}
    >
      <div
        className="container-item container-padding"
        style={{ paddingBottom: "15px" }}
      >
        <div className="method-heading">Phương thức thanh toán</div>
        <div className="container-item" style={{ width: "38.247%" }}>
          <div className="method-content">Thanh toán khi nhận hàng</div>
          <div className="method-change">THAY ĐỔI</div>
        </div>
      </div>
      <div
        className="container-item container-padding"
        style={{
          flexDirection: "column",
          alignItems: "end",
          gap: "15px 0",
          borderTop: "1px dashed #34251F",
          paddingTop: "21px",
        }}
      >
        <div className="container-item" style={{ width: "38.247%" }}>
          <div className="method-content">Tổng tiền hàng: </div>
          <div className="method-change" style={{ color: "black" }}>
            {formatCash(totalItemPrice)}đ
          </div>
        </div>
        <div className="container-item" style={{ width: "38.247%" }}>
          <div className="method-content">
            Phí vận chuyển ({distanceBetween2Point}km):{" "}
          </div>
          <div className="method-change" style={{ color: "black" }}>
            {formatCash(totalShipFee)}đ
          </div>
        </div>
        <div className="container-item" style={{ width: "38.247%" }}>
          <div className="method-content">Tổng thanh toán: </div>
          <div className="method-change" style={{ color: "black" }}>
            {formatCash(total)}đ
          </div>
        </div>
        <button className="button order" onClick={order}>
          ĐẶT HÀNG
        </button>
      </div>
      {function () {
        switch (state.state) {
          case "loading":
            return <Loading />;
          case "success":
            return <SuccessPopup state={state} />;
          case "error":
            return <ErrorPopup state={state} />;
          default:
            return null;
        }
      }.call(this)}
    </div>
  );
}

export default Total;
