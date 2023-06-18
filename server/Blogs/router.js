const express = require('express')
const router = express.Router()
const {upload} = require('./multer')
const {createBlog, editBlog, deleteBlog, saveBlog, deleteFromToWatch} = require('./controller')
const {isAuth}= require('../auth/middlewares')


router.post('/api/new',isAuth ,upload.single('image'), createBlog)
router.post('/api/edit',isAuth ,upload.single('image'), editBlog)
router.delete('/api/:id',isAuth , upload.single('image'),deleteBlog)
router.post('/api/save' ,isAuth ,saveBlog)
router.delete('/api/save/:id', isAuth,deleteFromToWatch)

module.exports=router