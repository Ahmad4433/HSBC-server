const User = require("../../../model/User");
const generateToken = require("../../../service/generate-token/generateToken");
const joi = require("joi");
const bcrypt = require("bcrypt");
const loginser = async (req, res, next) => {
  const { error: validationError } = validateUer(req.body);
  const { email, password } = req.body;

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const isEmailExist = await User.findOne({ email: email });
    if (!isEmailExist) {
      const error = new Error("invalid email address ");
      error.statusCode = 400;
      throw error;
    }
    const userPassword = isEmailExist.password;

    const isPassMatch = await bcrypt.compare(password, userPassword);
    if (!isPassMatch) {
      const error = new Error("invalid password");
      error.statusCode = 400;
      throw error;
    }

    const isVerified = isEmailExist.isVerified;
    if (isVerified !== 1) {
      const error = new Error("You haven't been verified yet. Please check your email for verification.");
      error.statusCode = 400;
      throw error;
    }
    const data = { Id: isEmailExist._id, email: email };

    const { accessToken, refreshToken } = await generateToken(data);

    res.status(200).json({
      message: "login successfully",
      token: { accessToken, refreshToken },
      userInfo: {
        userId: isEmailExist._id,
        userName: isEmailExist.userName,
        isVerified: isEmailExist.isVerified,
        role:isEmailExist.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginser;

function validateUer(data) {
  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });
  return userSchema.validate(data);
}
