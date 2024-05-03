import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  const tokenFromHeader = req.headers.authorization;

  if ( !tokenFromHeader)
    return res.status(401).json({ message: "Not Authenticated!" });

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (err, payload) => {
        if (err)
          return res
            .status(403)
            .json({ message: "Token from cookies is not valid!" });
        req.userId = payload.id;
        next();
      }
    );
  }
  // Verify token from headers
  else if (tokenFromHeader) {
    const token = tokenFromHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err)
        return res
          .status(403)
          .json({ message: "Token from headers is not valid!" });
      req.userId = payload.id;
      next();
    });
  }
};
