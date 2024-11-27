import { useDispatch } from "react-redux";
import { itemsSlice } from "../../redux/slice/ItemsSlice";
import { clientAPI } from "../../api/RestClient";
import { useState } from "react";

function DeletePopup({ deleteItem, setDeleteItem }) {
  const dispatch = useDispatch();
  const [state, setState] = useState("init");

  const closePopupWithEvent = (e) => {
    if (e.target.id === "children") setDeleteItem(null);
  };

  const deleteItemInCart = async () => {
    if (!deleteItem) return;

    setState("loading");

    try {
      // Kiểm tra URL endpoint gửi đi
      console.log("Deleting item with URL:", `/cart/${deleteItem.itemId}`);
      await clientAPI.service("/cart").remove(deleteItem.id);

      dispatch(itemsSlice.actions.deleteItemInCart({ itemId: deleteItem.itemId }));
      setDeleteItem(null);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      setState("error");
    } finally {
      setState("init");
    }
  };

  if (!deleteItem) return null;

  return (
    <div className="uiewr">
      <div
        id="children"
        className="mainContnt"
        onClick={(e) => closePopupWithEvent(e)}
        style={{ alignItems: "center", justifyContent: "space-evenly" }}
      >
        <div className="cart-page-delete-popup-container">
          <h3>Bỏ sản phẩm này khỏi giỏ hàng?</h3>
          <p>{deleteItem.productName}</p>
          <div>
            <button onClick={() => setDeleteItem(null)}>KHÔNG</button>
            <button
              onClick={() => deleteItemInCart()}
              style={{
                backgroundColor: "var(--heavyblue-color)",
                color: "white",
              }}
            >
              CÓ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
