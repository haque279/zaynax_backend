const express = require('express');
const router = express.Router();
const { PromoCode, promoValidation } = require('../models/PromoCode');

router.get('/', async (req, res) => {
  const promoCode = await PromoCode.find();
  res.send(promoCode);
});

router.post('/', async (req, res) => {
  const isError = promoValidation(req.body);
  if (isError.error) {
    return res.send({ error: isError.error.details[0].message });
  }
  try {
    const { promoCode } = req.body;
    const exits = await PromoCode.findOne({ promoCode }).exec();
    if(exits){
      return res.send('duplicate data found')
    }
    const promo = new PromoCode(req.body);
    const savedPromo = await promo.save();
    res.send(savedPromo);
  } catch (error) {
    res.send(error.errors);
  }
});

module.exports = router;
