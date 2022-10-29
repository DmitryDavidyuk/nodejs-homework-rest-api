const { BASE_URL } = process.env;

const createVerifyEmaul = (email, verificationToken) => {
  return {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">нажмите для подтверждения регистрации</a>`,
  };
};

module.exports = createVerifyEmaul;
