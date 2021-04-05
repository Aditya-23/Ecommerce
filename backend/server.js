const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express()
const port = process.env.PORT

mongoose.connect(process.env.MONGO_URI,  {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Database Connected!");   
});

app.use(cors());
app.use(express.json({limit:"50mb"}));

app.use("/public", express.static("backend/brands"));

app.use("/api/auth", require("./routes/user"));

app.use("/api/admin-auth", require("./routes/admin/user"));

app.use("/api/admin-category", require("./routes/admin/category"));

app.use("/api/admin-products", require("./routes/admin/product"));

app.use("/api/cart", require("./routes/cart"));

app.listen(port, () => console.log("Server is running.."))