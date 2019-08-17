const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');

let db = {};
let sequence = 0;

router.post('/', checkAuth, (request, response) => {
    const newProduct = {
        id: ++sequence,
        name: request.body.name,
        description: request.body.description
    };

    db[newProduct.id] = newProduct;

    response.status(201).json(newProduct);
})

router.get('/', (request, response) => {
    const toArray = key => db[key];
    const products = Object.keys(db).map(toArray);
    products && products.length
        ? response.json(products)
        : response.status(204).send();
});

router.get('/:productId', (request, response) => {
    const product = db[request.params.productId];
    product
        ? response.json(product)
        : notFound(request, response);
});

router.patch('/:productId', checkAuth, (request, response) => {
    const product = db[request.params.productId];
    const hasValue = request.body.done != null
    if (product) {
      product.name = request.body.name || product.name;
      product.description = request.body.description || product.description;
      response.json(product);
    } else {
      notFound(request, response);
    }
   });
   
   router.delete('/:productId', checkAuth, (request, response) => {
    const product = db[request.params.productId];
    if(product) {
      delete db[product.id];
      response.status(200).json({
        message: 'Deleted'
      });
    } else {
      notFound(request, response);
    }
   });
   
module.exports = router;