import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required:true,
    }
});

const User = mongoose.model("User", userSchema);

export default User;