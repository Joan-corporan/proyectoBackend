const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()
const{ getProductbyId, getProductbyFilter, getProduct}=require("../controllers/Product.Controllers")

router.get('/',getProduct)
router.get('/items/:_id',getProductbyId)
router.get('/filter/:filter',getProductbyFilter)

module.exports = router