const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static("public"));

//Templates engine config
app.set("view engine", "ejs");

//Routers
const cartRouter = require("./routes/cartRouter");
const homeRouter = require("./routes/homeRouter");
const loginRouter = require("./routes/loginRouter");
const productDetailRouter = require("./routes/productDetailRouter");
const registerRouter = require("./routes/registerRouter");

app.use("/", homeRouter);
app.use("/cart", cartRouter);
app.use("/login", loginRouter);
app.use("/productDetail", productDetailRouter)
app.use("/register", registerRouter);


// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/views/home.html"));
// });

// app.get("/home", (req, res) => {
//     res.sendFile(path.join(__dirname, "/views/home.html"));
// });

/* PRODUCT DETAIL */

// app.get("/productDetail", (req, res) => {
//     res.sendFile(path.join(__dirname, "/views/productDetail.html"));
// });

/* CART */

// app.get("/cart", (req, res) => {
//     res.sendFile(path.join(__dirname, "/views/cart.html"));
// });

//register
// app.get("/register", (req, res) => {
//     res.sendFile(path.join(__dirname, "/views/register.html"));
// });

// login

// app.get("/login", (req, res) => {
//     res.sendFile(path.join(__dirname, "/views/login.html"));
// });

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\n http://localhost:${PORT}`));
