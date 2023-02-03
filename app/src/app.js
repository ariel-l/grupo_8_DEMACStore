const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static("public"));

//Templates engine config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Routers
const products = require("./routes/productsRouter");
const home = require("./routes/homeRouter");
const users = require("./routes/usersRoutes");



app.use("/", home);
app.use("/", products);
app.use("/", users);



app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));
