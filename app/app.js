const express = require("express");
const app = express();
const path = require("path");
const { modify } = require("./controllers/modifyController");
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
const modifyRouter = require("./routes/modifyRouter");
const createRouter = require("./routes/createRouter");
const headerRouter = require("./routes/headerRouter");


app.use("/", homeRouter);
app.use("/cart", cartRouter);
app.use("/login", loginRouter);
app.use("/productDetail", productDetailRouter)
app.use("/register", registerRouter);
app.use("/productModify", modifyRouter);
app.use("/productCreate", createRouter);
app.use("/header", headerRouter);


app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));
