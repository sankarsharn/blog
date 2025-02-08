import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req , res , next) =>{
   const { username , email , password } = req.body;

   if(!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === ''){
       return next(errorHandler('Please fill in all fields' , 400));
    }
   
   const hashedPassword = await bcryptjs.hash(password , 12);
   const newUser =  new User({ username , email , password: hashedPassword });

   try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    return next(error)
  }

}