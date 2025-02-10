import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   username: {
         type: String,
         required: true,
         unique: true
   },
    email: {
            type: String,
            required: true,
            unique: true
    },
    password: {
            type: String,
            required: true
    },
    profilePicture: {
            type: String,
            default: "https://in.pinterest.com/pin/1057712662474908846/"
    },
    isAdmin: {
                type: Boolean,
                default: false
    }
} , { timestamps: true });

const User = mongoose.model('User' , UserSchema);

export default User;