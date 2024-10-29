const jwt = require("jsonwebtoken");
// 3.14
const authFetchUser = async (req, res, next) => {
  const token = req.header("auth_token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid Login/SignUp" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res
      .status(401)
      .send({ error: "Please authenticate using a valid Login/SignUp" });
  }
};

module.exports = authFetchUser;
