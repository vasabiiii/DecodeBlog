const Blog = require('./Blog')
const User = require('../auth/User')
const fs = require('fs')
const path = require('path')
const createBlog = async(req,res)=>{
       
        
           await new Blog({
                mainname:req.body.mainname,
                genre:req.body.genre,
                image:req.body.image,
                secname:req.body.secname,
                textabout:req.body.textabout,
                author:req.user._id
            }).save()
            res.redirect('/')

   
}


const editBlog= async(req, res)=>{
    const blogg  =await Blog.findById(req.body.id)
    // blogg.mainname = req.body.mainname
    // blogg.genre = req.body.genre
    // blogg.image = req.body.image
    // blogg.secname = req.body.secname
    // blogg.textabout = req.body.textabout
    // blogg.save()

    await Blog.findByIdAndUpdate(req.body.id, {
            mainname:req.body.mainname,
            genre:req.body.genre,
            image:req.body.image,
            secname:req.body.secname,
            textabout:req.body.textabout,
            author:req.user._id
        })
        res.redirect('/')
}

const deleteBlog= async(req,res)=>{
    const blog = await Blog.findById(req.params.id)
    if(blog){
        await Blog.deleteOne({_id:req.params.id})
        res.status(200).send('ok')
    }
}

const saveBlog = async(req,res)=>{
    if(req.user && req.body.id){
        const user = await User.findById(req.user.id)
        const findBlog = user.toWatch.filter(item => item._id == req.body.id)
        
         if(findBlog.length ==0){
             user.toWatch.push(req.body.id)
             user.save()
             res.send('Вам понравился блог')
         }else{
            res.send('Вы уже помечали блог')
         }
         
    }
    
}

const deleteFromToWatch=async(req,res)=>{
    if(req.user && req.params.id){
        const user = await User.findById(req.user.id)
        for(let i =0; i<user.toWatch.length; i++){
            if(user.toWatch[i]==req.params.id){
                user.toWatch.splice(i,1)
                user.save()
                res.send('Все, удалил!')
            }
        }
        
        
    }
    
}

module.exports = {
    createBlog,
    editBlog,
    deleteBlog,
    saveBlog,
    deleteFromToWatch
}