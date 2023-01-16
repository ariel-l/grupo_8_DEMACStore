const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static("public"));

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

/* PRODUCT DETAIL */

app.use("/productDetail", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/productDetail.html"));
});

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\n http://localhost:${PORT}`));
