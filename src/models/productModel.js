import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;