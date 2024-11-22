import ProductModel from "../models/ProductModel.js";

// GET /products
//chinh lai du lieu response ve phai co thuoc tinh total, data, limit, skip, sortBy
export const getAllProduct = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10; // Số sản phẩm tối đa mỗi trang (mặc định là 10)
    let skip = parseInt(req.query.skip) || 0; // Số sản phẩm bỏ qua (pagination)
    let sortBy = req.query.sortBy || "new";
    // Sắp xếp dựa trên sortBy
    let sortField = "";
    switch (sortBy) {
      case "hot":
        sortField = "sellQuantity";
        break;
      case "new":
        sortField = "updatedAt";
        break;
      case "sale":
        sortField = "discount";
        break;
      default:
        sortField = "name"; // Mặc định nếu không truyền gì
        break;
    }

    // Đếm tổng số sản phẩm
    var data = await ProductModel.find()
      .sort({ [sortField]: -1 }) // Sắp xếp giảm dần
      .skip(skip)
      .limit(limit);
    const total = await data.length;

    return res.status(201).json({
      total,
      data,
      limit,
      skip,
      sortBy,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /products/:id
export const getProductByParamID = async (req, res) => {
  console.log("getProductByParamsID");
  console.log(req.params);
  try {
    const data = await ProductModel.find({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /products/?id=value
export const getProductByQueryID = async (req, res) => {
  try {
    const productId = req.query.id;
    const data = await ProductModel.find({ _id: productId });
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /products va GET /products/?id=value
export const getProduct = async (req, res) => {
  const productId = req.query.id;
  try {
    if (productId) {
      await getProductByQueryID(req, res);
    } else {
      await getAllProduct(req, res);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// POST /products
// chinh lai response chi can co _id va name neu thanh tao thanh cong, k thi phai co error
export const insertProduct = async (req, res) => {
  const product = new ProductModel({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    discount: req.body.discount,
    stockQuantity: req.body.stockQuantity,
    image: req.body.image,
    brand: req.body.brand,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /products/:id
export const updateProduct = async (req, res) => {
  const productId = req.params._id;
  console.log(req.body);
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { id: productId },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      id: updatedProduct.id,
      name: updatedProduct.name,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// DELETE /products/:id
export const deleteProductByParamId = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// DELETE /products/?id=value
export const deleteProductByQueryId = async (req, res) => {
  const productId = req.query._id;
  try {
    const product = await ProductModel.findOneAndDelete({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//----------------------------------------------------------
//[GET] /product/get
// limit skip
// Get item with limit and skip in stock. Then sort its
// export const getProducts = async (req, res, next) => {
//   const url_params = url.parse(req.url, true);
//   const query = url_params.query;

//   try {
//     const _sortBy = query._sortBy;
//     const _limit = parseInt(query._limit);
//     const _skip = parseInt(query._skip);

//     productModel
//       .getProducts(_sortBy, _limit, _skip)
//       .then((items) => res.status(200).send(items.data.rows))
//       .catch((err) => res.status(400).send(err));
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };
// //[GET] /product/:id/get
// // Get item information base on its id
// export const getProductById = async (req, res, next) => {
//   const itemId = req.params.id;
//   productModel
//     .findProductById(itemId)
//     .then((item) => res.status(200).send(item))
//     .catch((err) => res.send(err));
// };
// //[GET]/product/getNumberOfAllItems
// export const getNumberOfAllProduct = async (req, res, next) => {
//   const protocol = process.env.DATABASE_PROTOCOL;
//   const host = process.env.DATABASE_HOST;
//   const port = process.env.DATABASE_PORT;
//   const username = process.env.DATABASE_ACCOUNT_USERNAME;
//   const password = process.env.DATABASE_ACCOUNT_PASSWORD;
//   axios
//     .get(`${protocol}://${username}:${password}@${host}:${port}/clothes-shop`)
//     .then((data) => res.send({ number: data.data.doc_count }));
// };
// //[PUT] /product
// // Add item to database
// export const addProduct = (req, res, next) => {
//   if (!checkFieldObject(req.body, "item")) {
//     res.status(400).send("");
//     return;
//   }
//   const item = JSON.parse(req.body.item);
//   productModel
//     .insertProduct(item)
//     .then(() => res.sendStatus(200))
//     .catch((err) => res.send(err));
// };

// //[POST] /product/:id/updateQuantityWhenOrder
// export const updateQuantityWhenOrder = (req, res, next) => {
//   if (!checkFieldObject(req.body, "quantity")) {
//     return;
//   }

//   const id = req.params.id;
//   const quantity = req.body.quantity;

//   productModel.getStockQuantityById(id).then((stockQuantity) => {
//     if (quantity > stockQuantity) {
//       res.status(400).send("Số lượng sản phẩm vượt quá số lượng trong kho!");
//       return;
//     }

//     productModel
//       .updateQuantity(id, quantity)
//       .then(() => res.sendStatus(200))
//       .catch((err) => res.send(err));
//   });
// };
