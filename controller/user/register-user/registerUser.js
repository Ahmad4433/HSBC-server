const User = require("../../../model/User");
const bcrypt = require("bcrypt");
const joi = require("joi");
const sendMail = require("../../../service/mail-sender/sendMail");
const crypto = require("crypto");

const registerUser = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);
  const { name, email, password } = req.body;

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const isExist = await User.findOne({ email: email });
    if (isExist) {
      const error = new Error("this email is already in use");
      error.statusCode = 400;
      throw error;
    }

    const hashedPAssword = await bcrypt.hash(password, 10);

    const hashKey = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      userName: name,
      email: email,
      password: hashedPAssword,
      verifyLink: hashKey,
    });

    const savedUSer = await newUser.save();

    const data = {
      subject: "verification proccess",
      value: hashKey,
    };

    const info = await sendMail(email, data);

   

    res.status(200).json({
      message:
        "please check your email address we have sent a verification link",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;

function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().min(2).max(32).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data);
}
