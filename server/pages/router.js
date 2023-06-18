const express = require('express')
const router = express.Router();
const Genres = require('../Genres/genres')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')
const Rate = require('../Rates/Rates')

router.get('/', async(req,res)=>{

    const options={}
    const genres = await Genres.findOne({key : req.query.genre})
    
    if(genres)
    {
        options.genre = genres._id
        res.locals.genre = req.query.genre
    }

    let page =0
    const limit = 4
    if(req.query.page && req.query.page > 0){
        page=req.query.page
    }

    if(req.query.search && req.query.search.length >0){
        options.$or = [
            {
                mainname: new RegExp(req.query.search, 'i')
            },
            {
                secname: new RegExp(req.query.search , 'i')
            }
        ]
    }

    const totalBlogs = await Blog.count(options)
    const allGenres = await Genres.find()
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('genre', 'name').populate('author', 'nick')
    const user =req.user ? await User.findById(req.user._id) : {}
    res.render('index',{genres:allGenres, user, blogs, pages : Math.ceil(totalBlogs / limit)})
})


router.get('/detail/:id', async(req,res)=>{

    const rates = await Rate.find({blogId: req.params.id}).populate('authorId')
 
    const genres = await Genres.findOne({key : req.query.genre})
    
    if(genres)
    {
        options.genre = genres._id
        res.locals.genre = req.query.genre
    }

    const allGenres = await Genres.find()
    const blogs = await Blog.findById(req.params.id).populate('genre').populate('author')
    const user =req.user ? await User.findById(req.user._id) : {}
    res.render('detail',{genres:allGenres,user:{}, blogs: blogs, user, rates: rates})
})


router.get('/editblog/:id', async(req,res)=>{
    const allGenres = await Genres.find()
    const blogs = await Blog.findById(req.params.id)
    res.render('editblog',{genres:allGenres , user:req.user ? req.user:{}, blogs})
})


router.get('/myadmin/:id', async (req,res)=>{
    const user=await User.findById(req.params.id)
    const options={}
    const genres = await Genres.findOne({key : req.query.genre})

    if(genres)
    {
        options.genre = genres._id
        res.locals.genre = req.query.genre
    }

    let page =0
    const limit = 4
    if(req.query.page && req.query.page > 0){
        page=req.query.page
    }


    if(req.query.search && req.query.search.length >0){
        options.$or = [
            {
                mainname: new RegExp(req.query.search, 'i')
            },
            {
                secname: new RegExp(req.query.search , 'i')
            }
        ]
    }

    const totalBlogs = await Blog.count()
    

    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('genre', 'name').populate('author', 'nick')
    if(user){
        res.render('myadmin' ,{ loginUser:req.user ? req.user:{},user:user, blogs , pages : Math.ceil(totalBlogs / limit)})
    }else{
        res.redirect('/not-found')
    }
    
})




router.get('/login', (req,res)=>{
    res.render('login', { user:req.user ? req.user:{}})
})
router.get('/reg',(req,res)=>{
    res.render('reg', { user:req.user ? req.user:{}})
})
router.get('/profile/:id', async(req,res)=>{

    const options={}
    const genres = await Genres.findOne({key : req.query.genre})
    
    if(genres)
    {
        options.genre = genres._id
        res.locals.genre = req.query.genre
    }


    let page =0
    const limit = 4
    if(req.query.page && req.query.page > 0){
        page=req.query.page
    }


    if(req.query.search && req.query.search.length >0){
        options.$or = [
            {
                mainname: new RegExp(req.query.search, 'i')
            },
            {
                secname: new RegExp(req.query.search , 'i')
            }
        ]
    }

    const totalBlogs = await Blog.count(options)

    const allGenres = await Genres.find()
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('genre', 'name').populate('author', 'nick')
    res.render('profile',{genres:allGenres , user:req.user ? req.user:{}, blogs, pages : Math.ceil(totalBlogs / limit)})
})


router.get('/newblog', async(req,res)=>{
    const allGenres = await Genres.find()
    res.render('newblog',{genres:allGenres , user:req.user ? req.user:{}})
})




router.get('/myprofile/:id', async (req,res)=>{
    const user=await User.findById(req.params.id)
    const blogs = await Blog.find().populate('genre', 'name').populate('author', 'nick')



    if(user){
        res.render('myprofil' ,{ user:user, loginUser:req.user , blogs})
    }else{
        res.redirect('/not-found')
    }
    
})

router.get('/liked/:id', async (req,res)=>{
    const user=await User.findById(req.params.id).populate('toWatch')
    const blogs = await Blog.find().populate('genre', 'name').populate('author', 'nick')

    
    if(user){
        res.render('liked' ,{ user:user, loginUser:req.user , blogs})
        
    }else{
        res.redirect('/not-found')
    }
    
})



router.get('/admin/:id', async(req,res)=>{

    const options={}
    const genres = await Genres.findOne({key : req.query.genre})
    
    if(genres)
    {
        options.genre = genres._id
        res.locals.genre = req.query.genre
    }

    let page =0
    const limit = 4
    if(req.query.page && req.query.page > 0){
        page=req.query.page
    }

    if(req.query.search && req.query.search.length >0){
        options.$or = [
            {
                mainname: new RegExp(req.query.search, 'i')
            },
            {
                secname: new RegExp(req.query.search , 'i')
            }
        ]
    }

    const totalBlogs = await Blog.count(options)

    const allGenres = await Genres.find()
    const user=await User.findById(req.params.id)
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('genre', 'name').populate('author', 'nick')
    res.render('adminProfile',{genres:allGenres , loginUser:req.user ? req.user:{},user:user , blogs, pages : Math.ceil(totalBlogs / limit)})
})

router.get('/edit/:id', async(req,res)=>{
    const allGenres = await Genres.find()
    res.render('edit',{genres:allGenres , user:req.user ? req.user:{}})
})

router.get('/not-found', (req,res)=>{
    res.render("notFound")
})




module.exports=router