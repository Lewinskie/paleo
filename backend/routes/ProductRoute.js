const router = require("express").Router();
const productContoller = require("../controllers/ProductController");

router.route("/product/:id").get(productContoller.getProductById);

router
  .route("/products")
  .post(productContoller.createProduct)
  .get(productContoller.getProducts);

module.exports = router;
