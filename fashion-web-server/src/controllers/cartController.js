import CartModel from "../models/CartModel.js";

// GET /cart
export const getAllCartItem = async (req, res) => {
  try {
    const username = req.query.username; // Lấy username từ query parameter
    let limit = parseInt(req.query.limit) || 10; // Số sản phẩm tối đa mỗi trang (mặc định là 10)
    let skip = parseInt(req.query.skip) || 0; // Số sản phẩm bỏ qua (pagination)
    if (!username) {
      return res.status(400).json({ message: "id is required" });
    }

    // Lấy danh sách sản phẩm trong giỏ hàng của người dùng
    const itemsInCart = await CartModel.find({ username })
      .sort({ ["createdAt"]: -1 })
      .skip(skip)
      .limit(limit);

    if (!itemsInCart || itemsInCart.length === 0) {
      return res.status(200).json({
        totalItems: 0,
        data: [],
        totalPrice: 0,
        username: username,
      });
    }

    // Tính tổng số lượng và tổng giá của toàn bộ giỏ hàng
    const totalItems = itemsInCart.length;
    let totalPrice = 0;

    const data = itemsInCart.map((item) => {
      const totalItemPrice = item.price * item.quantity;
      totalPrice += totalItemPrice;

      return {
        id: item._id,
        itemId: item.itemId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        status: item.status,
        totalPrice: totalItemPrice,
        itemRev: item._rev,
        size: item.size,
        color: item.color,
        image: item.image,
        discount: item.discount,
        category: item.category,
        price: item.price,
      };
    });
    // Trả về JSON với thông tin chi tiết
    res.json({
      totalItems,
      data: data,
      totalPrice,
      user: username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /cart/:itemId
export const getCartItemByParamID = async (req, res) => {
  try {
    const data = await CartModel.find({ _id: req.params.id });
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
    const id = req.query.id;
    const data = await CartModel.find({ _id: id });
    if (!data) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /cart va GET /cart/?username=value
export const getCart = async (req, res) => {
  const username = req.query.username;
  try {
    if (username) {
      await getAllCartItem(req, res);
    } else {
      await getCartItemByQueryID(req, res);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// POST /cart
export const insertCartItem = async (req, res) => {
  const cartItem = new CartModel({
    itemId: req.body.itemId,
    username: req.body.username,
    itemRev: req.body.itemRev,
    quantity: req.body.quantity,
    size: req.body.size,
    color: req.body.color,
    status: req.body.status,
    productName: req.body.productName,
    discount: req.body.discount,
    image: req.body.image,
    price: req.body.price,
  });
  console.log(cartItem);
  try {
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /cart
export const updateCartItem = async (req, res) => {
  const cartItemId = req.body.id;
  try {
    const updatedCartItem = await CartModel.findOneAndUpdate(
      { _id: cartItemId },
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
    const cartItem = await CartModel.findByIdAndDelete(req.params.id);
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
  const cartItemId = req.query.id;
  try {
    const cartItem = await CartModel.findOneAndDelete({ _id: cartItemId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    res.status(200).json({ message: "Cart Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
