const expressAsyncHandler = require("express-async-handler");
const { generateToken } = require("../utils");
const Order = require("../models/Order");

const createOrder = expressAsyncHandler(async (req, res) => {
  // DESTRUCTURE REQ.BODY
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  const newOrder = new Order({
    orderItems: orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    user: req.user._id,
  });

  const order = await newOrder.save();
  res.status(201).send({ message: "New Order Created", order });
});

exports.createOrder = createOrder;
