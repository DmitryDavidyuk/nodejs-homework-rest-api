const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(req.params);
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404);
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    message: "Email verify success",
  });
};

module.exports = verify;
