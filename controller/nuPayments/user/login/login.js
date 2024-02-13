const User = require("../../../../model/nupayment/User");
const bcrypt = require("bcrypt");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const findedUser = await User.findOne({ email: email });
    if (!findedUser) {
      const error = new Error("invalid email addresss");
      error.statusCode = 400;

      throw error;
    }

    const isMatched = await bcrypt.compare(password, findedUser.password);
    if (!isMatched) {
      const error = new Error("invalid password");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      success: true,
      userInfo: {
        role: findedUser.role,
        email: findedUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
