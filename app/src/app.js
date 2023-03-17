const express = require("express");
const app = express();
const path = require("path");
const methodOverride =  require('method-override')
const PORT = 3000;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieCheck = require("./middlewares/cookieCheck");

/* APPLICATION-LEVEL MIDDLEWARE */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: "DEMAC_Store",
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(cookieCheck);


/* TEMPLATE ENGINE CONFIG */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


/* ROUTERS */
const indexRouter = require("./routes");
const productsRouter = require("./routes/products");
const usersRoutes = require("./routes/users");


/* MIDDLEWARES ROUTES */
app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/users", usersRoutes);


/* START SERVER */
app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));
