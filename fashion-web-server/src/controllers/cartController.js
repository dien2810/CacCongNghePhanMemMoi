import CartModel from "../models/cartModel.js";

// GET /cart
export const getAllCartItem = async (req, res) => {
  try {
    const userId = req.query.userId; // Lấy username từ query parameter
    let limit = parseInt(req.query.limit) || 10; // Số sản phẩm tối đa mỗi trang (mặc định là 10)
    let skip = parseInt(req.query.skip) || 0; // Số sản phẩm bỏ qua (pagination)
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Lấy danh sách sản phẩm trong giỏ hàng của người dùng
    const itemsInCart = await CartModel.find({ userId })
      .sort({ ["createdAt"]: -1 })
      .skip(skip)
      .limit(limit);

    if (!itemsInCart || itemsInCart.length === 0) {
      return res.status(200).json({
        totalItems: 0,
        data: [],
        totalPrice: 0,
        user: userId,
      });
    }

    // Tính tổng số lượng và tổng giá của toàn bộ giỏ hàng
    const totalItems = itemsInCart.length;
    let totalPrice = 0;

    const data = itemsInCart.map((item) => {
      const totalItemPrice = item.price * item.quantity;
      totalPrice += totalItemPrice;

      return {
        itemId: item.itemId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        totalPrice: totalItemPrice,
        status: item.status,
      };
    });
    // Trả về JSON với thông tin chi tiết
    res.json({
      totalItems,
      data,
      totalPrice,
      user: userId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /cart/:itemId
export const getCartItemByParamID = async (req, res) => {
  try {
    const data = await CartModel.findById(req.params.itemId);
    if (!data) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /cart/?itemId=value
export const getCartItemByQueryID = async (req, res) => {
  try {
    const cartItemId = req.query.itemId;
    const data = await CartModel.findOne({ itemId: cartItemId });
    if (!data) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /cart va GET /cart/?itemId=value
export const getCart = async (req, res) => {
  const cartItemId = req.query.itemId;
  try {
    if (cartItemId) {
      await getCartItemByQueryID(req, res);
    } else {
      await getAllCartItem(req, res);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// POST /cart
export const insertCartItem = async (req, res) => {
  const cartItem = new CartModel({
    itemId: req.body.itemId,
    orderId: req.body.orderId,
    quantity: req.body.quantity,
    status: req.body.status,
    productName: req.body.productName,
    price: req.body.price,
    image: req.body.image,
    discount: req.body.discount,
  });
  try {
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /cart
export const updateCartItem = async (req, res) => {
  const cartItemId = req.body.itemId;
  try {
    const updatedCartItem = await CartModel.findOneAndUpdate(
      { itemId: cartItemId },
      req.body,
      { new: true }
    );
    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    res.status(200).json(updatedCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// DELETE /cart/:itemId
export const deleteCartItemByParamId = async (req, res) => {
  try {
    const cartItem = await CartModel.findByIdAndDelete(req.params.itemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    res.status(200).json({ message: "Cart Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// DELETE /cart/?itemId=value
export const deleteCartItemByQueryId = async (req, res) => {
  const cartItemId = req.query.itemId;
  try {
    const cartItem = await CartModel.findOneAndDelete({ itemId: cartItemId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    res.status(200).json({ message: "Cart Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
