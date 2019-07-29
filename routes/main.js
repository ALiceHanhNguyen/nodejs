const express = require('express');
const path = require('path');

const router = express.Router();

const pathDir = require('../util/path');

const products = [];

router.get('/', (req, res, next) => {
    res.render('shop/product');
});

router.use((req, res, next) => {
    res.status(404).sendFile(path.join(pathDir, 'views', '404.html'));
});

exports.Routes = router;
exports.Products = products;
