const express = require("express");
const dbConnectionb = require("./config/database");
const dotenv = require("dotenv");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/auitRouter");
const orderRouter = require("./routes/orderRoute");

const app = express();
dotenv.config({ path: "config.env" });

// Connect with db
dbConnectionb();

// Middlewares
app.use(express.json());

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/order", orderRouter);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
