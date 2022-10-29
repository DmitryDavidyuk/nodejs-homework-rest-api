const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uniqid = require("uniqid");

const { User } = require("../../models/user");
const { RequestError, sendEmail, createVerifyEmaul } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = uniqid();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = createVerifyEmaul(email, verificationToken);
  await sendEmail(mail);
  res.status(201).json({
    user: {
      email: result.email,
      subscription,
      verificationToken,
    },
  });
};

module.exports = signup;
