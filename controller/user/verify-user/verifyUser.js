const User = require("../../../model/User");
const generateTken = require("../../../service/generate-token/generateToken");

const verifyUser = async (req, res, next) => {
  const { token } = req.body;
  try {
    if (!token) {
      const error = new Error("verification token is missing");
      error.statusCode = 400;
      throw error;
    }

    const isVerified = await User.findOne({ verifyLink: token });
    if (!isVerified) {
      const error = new Error("verification failed please try again");
      error.statusCode = 400;
      throw error;
    }

    isVerified.isVerified = 1;
    isVerified.verifyLink = null;
    await isVerified.save();
    const data = {
      id: isVerified._id,
      email: isVerified.email,
    };
    const { accessToken, refreshToken } = await generateTken(data);

    res
      .status(200)
      .json({
        message: "your account has been verified thanks",
        tokens: { accessToken, refreshToken },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
