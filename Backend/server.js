const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const db = require("./config/db.js");
const adminRoutes = require("./routes/adminRoutes.js");
const productRoutes = require("./routes/productScreenRoutes.js");
const customerRoutes = require("./routes/customerRoutes.js");
const orderRoutes = require("./routes/ordersRoutes.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/users", customerRoutes);
app.use("/api/orders", orderRoutes);

// MAIN PORT
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.listen(PORT, console.log(`Server running in  on port ${PORT}`.yellow.bold));
