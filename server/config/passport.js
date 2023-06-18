const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
//CLIENT_ID : 272792848234-7ip50361kvkibaljh35r0mm3s9i727rg.apps.googleusercontent.com
//CLIENT_SECRET : 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

passport.use(new LocalStrategy(
    {
        usernameField:'email'
    },
    function(email, password, done){
       User.findOne({email}).then(user =>{
        if(user.password){
            bcrypt.compare(password, user.password, function(err, result) {
                if (err){return done(err)}
                if(result){return done(null, user)}
              });
        }else{
            return done('Пользователь не найден')
        }
        
       }).catch(e=>{
            return done(e)
       })
    }
))


passport.use(new GoogleStrategy({
    clientID:     '272792848234-7ip50361kvkibaljh35r0mm3s9i727rg.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/api/auth/google",
    scope:['openid','email', 'profile'] ,
    
  },
  async function(request, accessToken, refreshToken, profile, cb) {
    const user = await User.find({ googleId: profile.id})
    console.log(profile)
    const newUser = await new User({
        googleId: profile.id,  
        full_name: profile.displayName,
        email: profile. emails[0].value,
        imagep: profile.photos[0].value,
        nick: profile.given_name
    }).save()
    return cb(null, newUser);

  }
));

passport.serializeUser(function(user, done){
   done(null, user._id)
})

passport.deserializeUser(function(id,done){
    User.findById(id).then((user, err)=>{
        done(err, user)
    })
})