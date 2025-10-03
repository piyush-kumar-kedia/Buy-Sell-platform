import mongoose from "mongoose"
import bcypt from "bcrypt"

const UserSchema= new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  email:{
  type: String,
    required: true
  },
  password:{
    type: String,
    required:true
  },
  phone:{
    type: String,
  }
},{
    timestamps:true
});

// UserSchema.pre('save', async (next) => {
//   if(!this.isModified('password')){
//     return next();
//   }
//   try{
    
//   }
// })

export default mongoose.model("User",UserSchema);