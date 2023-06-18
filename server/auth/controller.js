const { model } = require('mongoose')
const User = require('./User')
const bcrypt = require('bcrypt')





const editUser = async(req,res)=>{
    await User.findByIdAndUpdate(req.body.id,{
        email:req.body.email,
        full_name:req.body.full_name,
        nick:req.body.nick,
        imagep:req.body.imagep,
    })
    res.redirect('/')
}


const signUp = async(req,res)=>{
    if(req.body.email.lenght <=0 && 
    req.body.full_name.lenght <=0 && 
    req.body.password.lenght <=0 && 
    req.body.re_password.lenght <=0
    ){
        res.redirect('/reg?error=1')
    }else if(req.body.password !== req.body.re_password){
        res.redirect('/reg?error=2')
    }
    const findUser= await User.findOne({email : req.body.email}).count()
    if(findUser){
        res.redirect('/reg?error=3')
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            new User({
                email:req.body.email,
                full_name:req.body.full_name,
                isAdmin:false,
                password:hash,
                nick:req.body.nick,
                imagep:req.body.imagep
            }).save()
            res.redirect('/login')
        });
    })

   
}   

const signIn = (req,res) =>{
    if(req.user.isAdmin){
        res.redirect(`/admin/${req.user._id}`)
    }
    else{
        res.redirect(`/profile/${req.user._id}`)
    }
    
}

const signOut=(req, res)=>{
    req.logout(function(err){
        if(err){
            console.log(err);
        }
    })
    res.redirect('/')
}










module.exports={
    signUp,
    signIn,
    signOut,
    editUser
}