const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // get the token from a string like: bearer qwyffvbneiw
  const token = authorization.split(" ")[1];

  try {
    // get id of the authenticated user from payload
    const { _id } = jwt.verify(token, process.env.SECRET);

    // attach user to the req obj with the id property
    req.user = await User.findOne({ _id }).select("_id");
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
  next();
};

module.exports = requireAuth;
