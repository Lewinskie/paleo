const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const { isAuth } = require("../utils");

router.post("/orders", isAuth, OrderController.createOrder);

module.exports = router;
