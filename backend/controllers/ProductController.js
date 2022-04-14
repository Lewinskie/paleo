const Product = require("../models/Product");

// CREATE NEW PRODUCT
const createProduct = async (req, res) => {
  try {
    //   FIRST DESTRUCTURE REQ.BODY
    const {
      brand,
      category,
      countInStock,
      description,
      id,
      image,
      name,
      numReviews,
      price,
      rating,
    } = req.body;

    // CHECK IF THE PRODUCT EXISTS FIRST USING THE UNIQUE VALUE
    const product = await Product.findOne({ id });
    if (product) res.status(400).json({ msg: "Product exists" });

    // CREATE NEW PRODUCT
    const newProduct = new Product({
      brand,
      category,
      countInStock,
      description,
      image,
      id,
      name,
      numReviews,
      price,
      rating,
    });

    // SAVE NEW PRODUCT
    await newProduct.save();

    // RETURN SUCCESS MESSAGE
    res.status(201).json({ msg: "New Product Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    let products;
    products = await Product.find();
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(400).json({ msg: "Products not found!" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  let product;
  const _id = req.params.id;
  try {
    product = await Product.findById(_id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ msg: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.getProducts = getProducts;
