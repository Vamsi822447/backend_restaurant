const express = require('express')

const productController = require('../controllers/productController')

const router = express.Router()

router.get('/allproducts/:firmId', productController.getProductsByFirm)

router.post('/add-product/:firmId', productController.addProduct)

router.delete('/delete-product/:productId', productController.deleteProduct)

module.exports = router