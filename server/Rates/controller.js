const Rate = require('./Rates')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')
const fs = require('fs')
const path = require('path')


const saveRate = async(req,res)=>{
    if(req.body.authorId && req.body.blogId )
        await new Rate({
            text:req.body.text,
            blogId:req.body.blogId,
            authorId:req.body.authorId,
            date:Date.now(),
            author:req.user._id
        }).save()
       
        res.status(200).send(true)
        
}

const deleteCom = async(req,res)=>{
    const comm = await Rate.findById(req.params.id)
   
    if(comm){
        await Rate.deleteOne({_id:req.params.id})
        res.status(200).send('ok')
    }
}

const editCom = async (req,res) =>{
   
        await Rate.findByIdAndUpdate(req.body.id,{
            text:req.body.text
            
        })
        res.send('ok')
    
    
    
    
   
}




module.exports={
    saveRate,
    deleteCom,
    editCom
}