const express = require('express');
const path = require('path');
const mainRouter = require('./main');

const router = express.Router();
router.use('/product-list', (req, res, next) => {
    res.render('shop/product-list', { prods: mainRouter.Products });
});

router.post('/add-product', (req, res, next) => {
    const productName = req.body.productName;
    console.log('1111111', productName);
    if (productName) {
        mainRouter.Products.push({ title: productName});
    }
    res.redirect('/product-list');
});

router.get('/product', (req, res, next) => {
    res.redirect('/');
});

module.exports = router;