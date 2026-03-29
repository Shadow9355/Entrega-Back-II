import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    purchaser: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }
    ],
    purchase_datetime: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;