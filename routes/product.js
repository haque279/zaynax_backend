const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product, productValidation } = require('../models/Product');

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.get('/', async (req, res) => {
  const product = await Product.find();

  res.send(product);
});

router.post('/', upload.single('image'), async (req, res) => {
  // return res.send('test');
  // return res.send(req.file);
  const isError = productValidation(req.body);
  if (isError.error) {
    return res.send({ error: isError.error.details[0].message });
  }
  try {
    const duplicate = await Product.findOne({ title: req.body.title });
    if (duplicate) {
      return res.send('Dublicate title found');
    }
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (error) {
    res.send(error.name);
  }
});

module.exports = router;
