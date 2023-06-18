const isAuth = (req, res, next)=>{
    console.log(req.user)
    if(req.user){
        next()
    }else{
        res.status(401).send('Нет такого')
    }
}

module.exports={
    isAuth
}