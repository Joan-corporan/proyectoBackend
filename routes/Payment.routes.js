const express=require('express')
const { createPayment, successPayment, pendingPayment, failurePayment } = require('../controllers/Payment.controllers')
const router=express.Router()

router.get('/',(req, res)=>{
    res.json({
        message:'ruta payment'
    })
    
})
router.post('/create-payment',createPayment)
router.post('/succes-payment', successPayment)
router.post('/pending-payment', pendingPayment)
router.post('/failure-payment', failurePayment)
module.exports=router