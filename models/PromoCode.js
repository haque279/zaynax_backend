const Joi = require('joi');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const promoSchema = new schema({
  promoCode: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  discountRate: {
    type: Number,
    required: true,
  },
  useTime: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const promoValidation = (data) => {
  const promoValidationSchema = Joi.object({
    promoCode: Joi.string().alphanum().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    discountRate: Joi.number().required(),
    useTime: Joi.string().required(),
    status: Joi.boolean().required(),
  });
  return promoValidationSchema.validate(data);
};

module.exports.PromoCode = mongoose.model('promo_code', promoSchema);
module.exports.promoValidation = promoValidation;
