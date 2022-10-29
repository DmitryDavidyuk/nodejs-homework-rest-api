const { RequestError, sendEmail, verificationToken } = require("../../helpers");
const { User } = require("../../models/user");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, "Email not found");
  }
  const mail = verificationToken(email, user.verificationToken);
  await sendEmail(mail);
  res.json({
    message: "Verify email resend",
  });
};

module.exports = resendVerify;
