const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json');

const getCartsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProduct = cart.products.find(prod => prod.id === id);
            if (existingProduct) {
                const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
                cart.products[existingProductIndex] = { ...existingProduct };
                cart.products[existingProductIndex].qty = cart.products[existingProductIndex].qty + 1;
            } else {
                cart.products = [ ...cart.products, { id: id, qty: 1 } ];
            }
            cart.totalPrice += parseInt(productPrice);
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    console.log(err);
                }
            })
        });
    }

    static fetchAll(cb) {
        getCartsFromFile(cb);
    }

    static findById(id, cb) {
        getCartsFromFile(cart => {
            let c = null;
            if (cart.products && cart.products.length > 0) {
                c = cart.products.find(p => p.id === id);
            }
            cb(c);
        })
    }

    static deleteById(id, price) {
        getCartsFromFile(cart => {
            let total = cart.totalPrice;
            const updateProducts = [ ...cart.products ];
            if (updateProducts && updateProducts.length > 0) {
                const productIndex = updateProducts.findIndex(i => i.id === id);
                if (productIndex > -1) {
                    total = cart.totalPrice - parseInt(updateProducts[productIndex].qty) * parseInt(price);
                    updateProducts.splice(productIndex, 1);
                }
            }
            const updateCart = { products: updateProducts, totalPrice: total };
            fs.writeFile(p, JSON.stringify(updateCart), err => {
                if (err) {
                    console.log(err);
                }
            })
        });
    }
}