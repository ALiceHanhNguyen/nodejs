const express = require('express');
const productComponent = require('../components/product');

const router = express.Router();

router.get('/add-product', productComponent.getAddProduct);

router.post('/add-product', productComponent.postAddProduct);

module.exports = router;