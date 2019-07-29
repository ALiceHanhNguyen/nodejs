const express = require('express');

const router = express.Router();

const productComponent = require('../components/product');
const mainComponent = require('../components/main');

router.get('/', productComponent.getProducts);

router.use(mainComponent.getError404);

module.exports = router;

