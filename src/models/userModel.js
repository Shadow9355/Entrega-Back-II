import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        trim: true,
        default: "user"
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    }
});

const User = mongoose.model("User", userSchema);

export default User;