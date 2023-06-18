const express = require('express')
const app = express();
const session = require('express-session')
const mongooseStore = require('connect-mongo');
const passport = require('passport');


require('./server/config/db')
require('./server/config/passport')


app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded())

app.use(express.json())

app.use(session({
    name:'decodeblog.session',
    secret: 'keyboard cat',
    maxAge:1000*60*60*7,
    resave:false,
    store:mongooseStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017'
    })
}))

app.use(passport.initialize())
app.use(passport.session())


app.set('view engine','ejs')
app.use(require('./server/pages/router'))
app.use(require('./server/Genres/router'))
app.use(require('./server/auth/router'))
app.use(require('./server/Blogs/router'))
app.use(require('./server/Rates/router'))



const PORT =3000;
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})