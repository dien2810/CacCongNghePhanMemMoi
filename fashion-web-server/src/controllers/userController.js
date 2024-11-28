import User from "../models/UserModel.js";
import ProductModel from "../models/ProductModel.js";
import CartModel from "../models/CartModel.js";
// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Giả sử có trường location
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy người dùng theo ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserByQueryId = async (req, res) => {
  try {
    const { id } = req.query; // Lấy id từ query
    const user = await User.findById(id); // Tìm người dùng theo id
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const findUserByUsernameAndPassword = async (username, password) => {
  try {
    const user = await User.findOne({ username, password });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return user;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo người dùng mới
export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Tìm user theo ID
    if (!user) return res.status(404).json({ message: "User not found" });

    // Gộp dữ liệu mới từ body request
    Object.assign(user, req.body);
    const updatedUser = await user.save(); // Lưu thay đổi
    res.json({
      id: updatedUser.id,
      fullname: updatedUser.fullname,
      number: updatedUser.number,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa người dùng theo query id
export const deleteUserByQueryId = async (req, res) => {
  try {
    const { id } = req.query; // Lấy id từ query
    const user = await User.findByIdAndDelete(id); // Tìm và xóa người dùng theo id
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const order = async (req, res) => {
  try {
    console.log(req.body);
    const username = req.body.username;
    const cartReq = req.body.cart;
    const cart = await CartModel.find({ username });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // let items = user.items;
    for (var i in cartReq) {
      let product = await ProductModel.find({ itemId: cartReq[i].itemId });
      let stockQuantity = product.stockQuantity;
      if (cartReq[i].quantity > stockQuantity) {
        return res.status(404).json({
          message: `Sản phẩm ${cartReq[i].productName} đang vượt quá số lượng trong kho`,
        });
      }
    }

    for (var i in cartReq) {
      const index = cart.findIndex(
        (item) => item.status === "in_cart" && item.itemId === cart[i].itemId
      );

      // If there is an item having the quantity equal 0, skip it
      if (cartReq[i].quantity === 0) {
        cart.splice(index, 1);
        continue;
      }

      cart[index].quantity = cartReq[i].quantity;
      cart[index].status = "on_shipping";
      await ProductModel.updateOne(
        { _id: cart[i].itemId },
        { stockQuantity: stockQuantity - cart[i].quantity }
      );
    }
    await User.findOneAndUpdate({ username }, { items: cart });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
