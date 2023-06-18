const User = require('../auth/User')
const bcrypt = require('bcrypt')
async function createAdmin(){
    const findAdmin =await User.find({isAdmin:true}).count()
    if(findAdmin ==0){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash('177013AR', salt, function(err, hash) {
                new User({
                    full_name:'Бастык (важный)',
                    email: 'abitdinov@bk.ru',
                    isAdmin:true,
                    password:hash,
                    imagep:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-yf0LsyHHvqkaQpcyBYSAVrtIflLBhym67A&usqp=CAU'
                }).save()
            })
        })
    }
}
module.exports = createAdmin