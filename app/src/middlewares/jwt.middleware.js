const jwt = require("jsonwebtoken");
const process = require("process");
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "El token ha expirado" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Token inválido" });
      } else {
        return res.status(500).json({ message: "Error interno del servidor" });
      }
    }

    req.user = decodedToken.payload && decodedToken.payload.user;

    next();
  });
};

module.exports = verifyToken;
