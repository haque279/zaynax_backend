const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Joi = require('joi');

const orderSchema = new schema({
  orderNo: {
    type: Number,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    max: 2,
  },
});

const orderValidation = (data) => {
  const orderValidationSchema = Joi.object({
    orderNo: Joi.number().required(),
    itemPrice: Joi.number().required(),
    status: Joi.number().max(2).required(),
  });

  return orderValidationSchema.validate(data);
};

module.exports.Order = mongoose.model('order', orderSchema);
module.exports.orderValidation = orderValidation;
