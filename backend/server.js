const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const data = require("./data");

//CONNECTION TO mongoDB
connectDB();

//MIDDLEWARE
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//ROUTES

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

app.use("/api", require("./routes/ProductRoute"));

//PORT
const PORT = process.env.PORT;

//APP LISTENER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
