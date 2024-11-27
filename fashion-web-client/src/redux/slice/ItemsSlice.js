import { createSlice } from "@reduxjs/toolkit";

let items;
try {
  const rawItems = localStorage.getItem("items");
  items = rawItems ? JSON.parse(rawItems) : []; // Kiểm tra và sử dụng mảng rỗng nếu không có dữ liệu
} catch (error) {
  console.error("Dữ liệu trong localStorage không hợp lệ:", error);
  items = []; // Gán giá trị mặc định
  localStorage.setItem("items", JSON.stringify(items)); // Ghi lại giá trị hợp lệ
}

// Khởi tạo state ban đầu
const initState = {
  userItems: items,
  numberItems: items.length || 0, // Số lượng items
  popupItem: null,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState: initState,
  reducers: {
    setUserItems: (state, action) => {
      localStorage.setItem("items", JSON.stringify(action.payload));
      state.userItems = action.payload;
    },

    deleteUserItems: (state) => {
      localStorage.setItem("items", JSON.stringify([])); // Đặt lại mảng rỗng
      state.userItems = [];
    },
    

    setPopupItem: (state, action) => {
      state.popupItem = action.payload;
    },

    deletePopupItem: (state) => {
      state.popupItem = null;
    },

    userItemsUpdateQuantity: (state, action) => {
      const { itemId, quantity, shipFee } = action.payload;
      const index = state.userItems.findIndex(
        (item) => item.itemId === itemId && item.status === "in_cart"
      );
      if (index !== -1) {
        state.userItems[index].quantity = quantity;
        state.userItems[index].shipFee = shipFee;
        localStorage.setItem("items", JSON.stringify(state.userItems));
      }
    },

    setNumberItems: (state, action) => {
      state.numberItems = action.payload;
    },

    deleteItemInCart: (state, action) => {
      const updatedItems = state.userItems.filter(
        (item) => item.itemId !== action.payload.itemId
      );
      state.userItems = updatedItems;
      localStorage.setItem("items", JSON.stringify(updatedItems));
    }    
  },
});
