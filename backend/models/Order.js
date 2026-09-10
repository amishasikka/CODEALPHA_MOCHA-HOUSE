const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    customer: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Placed"
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);