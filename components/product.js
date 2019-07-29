const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            path: '/',
            hasProducts: products.length > 0
        });
    });
}

exports.getAddProduct = (req, res, next) => {
    res.render('shop/product', {
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.productName);
    product.save();
    res.redirect('/');
}
