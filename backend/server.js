const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection error:", error));

app.get("/", (req, res) => {
    res.json({ message: "Mocha House API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});