const express = require('express')
const router = express.Router()
const {saveRate, deleteCom, editCom} = require('./controller')
const {isAuth}= require('../auth/middlewares')


router.post('/api/rate', saveRate)
router.delete('/api/rate/:id', isAuth, deleteCom)
router.post('/api/editcom', isAuth, editCom)

module.exports= router