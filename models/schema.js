const mongoose=require("mongoose");
const urlSchema=new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true,
        unique:true,
    },
    shortUrl:{
        type:String,
        unique:true,
        required:true,
    },
    clickCount: {
        type: Number,
        default: 0
    }
})
module.exports=mongoose.model('schema',urlSchema)