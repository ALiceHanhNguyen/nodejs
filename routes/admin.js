const express = require('express');
const adminComponent = require('../components/admin');

const router = express.Router();

router.get('/products', adminComponent.getProducts);
router.get('/add-product', adminComponent.getAddProduct);
router.post('/add-product', adminComponent.postAddProduct);
router.get('/edit-product/productId=:productId&&editing=:editing', adminComponent.getEditProduct);
router.post('/edit-product/productId=:productId', adminComponent.postEditProduct);
router.post('/delete-product', adminComponent.postDeleteProduct);

module.exports = router;