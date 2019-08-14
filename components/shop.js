const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            path: '/'
        });
    });
}

exports.getDetailProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('shop/product-detail', { product });
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            path: '/products'
        });
    });
}

exports.getCart = (req, res, next) => {
    Cart.fetchAll(cart => {
        Product.fetchAll(prods => {
            const cartProducts = [];
            for (prod of prods) {
                const cartProductData = cart.products.find(i => i.id === prod.id);
                if (cartProductData) {
                    cartProducts.push({ ...prod, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                cart: { products: cartProducts, totalPrice: cart.totalPrice },
                path: '/cart'
            });
        });
    });
}

exports.postCart = (req, res, next) => {
    const { productId, productPrice } = req.body;
    Cart.addProduct(productId, productPrice);
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout'
    });
}

exports.postEditProduct = (req, res, next) => {
    const { productId } = req.body;
    Cart.findById(productId, cart => {

    });
}

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.findById(productId, prod => {
        if (prod) {
            Cart.deleteById(productId, prod.price);
        }
        res.redirect('/cart');
    });
}