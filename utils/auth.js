const jwt = require("jsonwebtoken");
const { User } = require("../resources/user/user.model");

const jwtSecret = "LearnEverything";

const newToken = (user) => {
  return jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: "100d",
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ message: "Need Email and Password" });

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ message: "Need Email and Password" });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const match = await user.checkPassword(password);
    if (!match) {
      return res.status(401).send({ message: "Password is incorrect" });
    }

    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authentication failed" });
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  let user;
  console.log(payload);
  try {
    user = await User.findById(payload.id).select("-password").lean().exec();
    if (!user) {
      return res.status(401).end();
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }

  req.user = user;
  next();
};

module.exports = { signup, signin, protect };
