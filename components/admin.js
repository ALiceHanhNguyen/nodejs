const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            path: '/admin/products',
            hasProducts: products.length > 0
        });
    });
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    Product.fetchAll(products => {
        let id = "10000";
        if (products.length > 0) {
            const length = products.length;
            id = parseInt(products[length - 1].id, 10) + 1;
        }
        const { title, imageUrl, description, price } = req.body;
        const product = new Product(id.toString(), title, imageUrl, description, price);
        product.save();
        res.redirect('/');
    });
}

exports.getEditProduct = (req, res, next) => {
    const { editing, productId } = req.params;
    if (!editing) {
        res.redirect('/');
    } else {
        Product.findById(productId, prod => {
            if (!prod) {
                res.redirect('/');
            } else {
                res.render('admin/add-product', {
                    product: prod,
                    editing
                });
            }
        });
    }
}

exports.postEditProduct = (req, res, next) => {
    const { productId } = req.params;
    const { title, imageUrl, description, price } = req.body;
    Product.findById(productId, prod => {
        if (prod) {
            prod = new Product(prod.id, title, imageUrl, description, price);
            prod.save();
            res.redirect(`/products/productId=${ productId }`);
        } else {
            res.redirect('/');
        }
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.findById(productId, prod => {
        if (prod) {
            Cart.deleteById(productId, prod.price);
            Product.deleteById(productId, () => {
                res.redirect('/admin/products');
            });
        }
        res.redirect('/admin/products');
    });
}