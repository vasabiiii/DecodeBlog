const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema= new mongoose.Schema({
    mainname:String,
    genre: {type: Schema.Types.ObjectId, ref: 'genre'},
    image:String,
    secname:String,
    textabout:String,
    author: {type: Schema.Types.ObjectId, ref: "user"}

})

module.exports=mongoose.model('blogs', BlogSchema)