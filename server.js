require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
