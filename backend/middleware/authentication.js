const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
 

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }

  try {
    const trueToken = jwt.verify(token, process.env.SECRET);
    console.log(trueToken);

    if (trueToken) {
      req.token = trueToken;
     
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "The token is invalid or expired",
      });
    }
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "The token is invalid or expired",
    });
  }
};

module.exports = authentication;
