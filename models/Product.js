const Joi = require('joi');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const prodectShema = new schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    max: 2,
  },
});

const productValidation = (data) => {
  const productValidationSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    color: Joi.string().required(),
    size: Joi.string().required(),
    image: Joi.string().required(),
    status: Joi.number().max(2).required(),
  });
  return productValidationSchema.validate(data);
};

module.exports.Product = mongoose.model('product', prodectShema);
module.exports.productValidation = productValidation;
