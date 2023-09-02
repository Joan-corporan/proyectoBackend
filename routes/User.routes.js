const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

const { signup, getUsers, updateUsers, deleteUsers, login, updateUserById, deleteUserById, getUserById}= require('../controllers/User.Controllers')
const auth = require('../middlewares/auth')

router.get('/',getUsers)
router.post('/',signup)
router.put('/',updateUsers)
router.delete('/',deleteUsers)
router.post('/login',login)  
router.get('/perfil/:_id',auth,getUserById)

router.put('/',updateUserById)
router.delete('/',deleteUserById)

module.exports= router