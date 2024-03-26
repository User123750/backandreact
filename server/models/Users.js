const mongoose=require('mongoose');
const UserSchema= new  mongoose.Schema({
   id:{
    type:Number,
   },
   description:{
    type:String,
   },
})
const UserModel=mongoose.model("Users",UserSchema)
module.exports=UserModel