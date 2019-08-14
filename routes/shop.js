const express = require('express');

const router = express.Router();

const shopComponent = require('../components/shop');
const errorComponent = require('../components/error');

router.get('/', shopComponent.getIndex);

router.get('/products', shopComponent.getProducts);
router.get('/products/productId=:productId', shopComponent.getDetailProduct);

router.get('/cart', shopComponent.getCart);
router.post('/cart', shopComponent.postCart);

router.post('/cart/edit-product', shopComponent.postEditProduct);
router.post('/cart/delete-product', shopComponent.postDeleteProduct);

router.get('/orders', shopComponent.getOrders);
router.get('/checkout', shopComponent.getCheckout);

router.use(errorComponent.getError404);

module.exports = router;
