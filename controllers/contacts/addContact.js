const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await (
    await Contact.create({ ...req.body, owner })
  ).populate("owner", "email");
  res.status(201).json(result);
};

module.exports = addContact;
