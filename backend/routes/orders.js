const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { customer, items, paymentMethod, total } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        const order = await Order.create({
            userId: req.userId,
            customer,
            items,
            paymentMethod,
            total
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        console.error("Order error:", error);
        res.status(500).json({ message: "Order placement failed" });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch orders" });
    }
});

module.exports = router;