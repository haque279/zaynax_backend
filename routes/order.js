const express = require('express');
const router = express.Router();
const { Order, orderValidation } = require('../models/Order');

router.get('/', async (req, res) => {
  const order = await Order.find();
  res.send(order);
});

router.post('/', async (req, res) => {
  const isError = orderValidation(req.body);
  if (isError.error) {
    return res.send({ error: isError.error.details[0].message });
  }
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.send(savedOrder);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
