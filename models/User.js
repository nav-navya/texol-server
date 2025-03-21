import mongoose from "mongoose";

 const UserSchema = new mongoose.Schema({
  fullName:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  phone:{type:Number,required:true,unique:true},
  role:{type:String,enum:['Student','Employee'],required:true},
  password: { type: String, required: true },
})

const User = mongoose.model("User",UserSchema)
export default User