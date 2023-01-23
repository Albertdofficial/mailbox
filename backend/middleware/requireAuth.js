const jwt = require("jsonwebtoken");
const { default: isEmail } = require("validator/lib/isEmail");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // get the token from a string like: bearer qwyffvbneiw
  const token = authorization.split(" ")[1];

  // get id of the authenticated user from payload

  try {
    const _id = jwt.verify(token, process.env.SECRET);

    if (!_id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    // attach user to the req obj with the id property
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = requireAuth;
