const createUserToken = require("../helpers/generateToken");
const sendResponse = require("../helpers/sendResponse")
const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const signup = async (req, res, next) => {
    try {
      
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return sendResponse(res, { status: 400, message: "Email already exists", success: false });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT));
        let user = await User.create({
            ...req.body,
            password: hashedPassword
        })

        sendResponse(res, { status: 201, message: "user created", success: true })
    }
    catch (error) {

        next(error)
    }
}

const login = async (req,res,next) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, { status: 401, message: "Email or Password is Wrong", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return sendResponse(res, { status: 401, message: "Email or Password is Wrong", success: false });
    }
    const token = createUserToken(user._id)
    sendResponse(res, {
      status: 200,
      message: "Login successful",
      success: true,
      data: { token, user: { id: user._id, username: user.username, email: user.email } },
    });
  } catch (error) {
    next(error);
  }
}


module.exports = {
    signup,
    login,
}