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



app.get("/header", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/header.html"));
});

app.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/productCreate.html"));
});

app.get("/modify", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/productModify.html"));
});

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));
