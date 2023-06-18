const express = require('express')
const passport = require('passport')
const router = express.Router()
const {signUp, signIn, signOut, editUser} = require('./controller')
const createAdmin = require('../admin/seed')
const { isAuth } = require('./middlewares')

router.post('/api/signup' , signUp)
router.post('/api/signin' , passport.authenticate('local',{failureRedirect : '/login?error=1'}), signIn)
router.get('/api/signout', signOut)
router.post('/api/editt', isAuth, editUser)
router.get('/api/auth/google', passport.authenticate('google'), (req,res)=>{
    res.redirect('/profile/' + req.user._id)
})

createAdmin()
module.exports= router