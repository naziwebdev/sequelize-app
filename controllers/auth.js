const { User } = require("../db");
const registerSchema = require("../validators/registerSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const redis = require("../redis");
const configs = require("../configs");

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    await registerSchema.validate(
      { name, username, email, password },
      { abortEarly: false }
    );

    const existUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
      raw: true,
    });

    if (existUser) {
      return res.status(400).json({ message: "user register already" });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    const users = await User.count();

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: users > 0 ? "user" : "admin",
      provider: password ? "local" : "google",
    });

    const accessToken = jwt.sign(
      { userID: user.id },
      configs.auth.accessTokenSecretKey,
      {
        expiresIn: configs.auth.accessTokenExpireIn,
      }
    );

    const refreshToken = jwt.sign(
      { userID: user.id },
      configs.auth.refreshTokenAccessKey,
      {
        expiresIn: configs.auth.refreshTokenExpireIn,
      }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    redis.set(
      `refteshToken:${user.id}`,
      hashedRefreshToken,
      "EX",
      configs.auth.refreshTokenExpireIn
    );

    res.cookie("access-token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 9000000,
    });

    res.cookie("refresh-token", hashedRefreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 9000000,
    });

    return res.status(201).json({ message: "user register successfully" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = req.user;

    const accessToken = jwt.sign(
      { userID: user?.id },
      configs.auth.accessTokenSecretKey,
      {
        expiresIn: configs.auth.accessTokenExpireIn,
      }
    );

    const refreshToken = jwt.sign(
      { userID: user.id },
      configs.auth.refreshTokenAccessKey,
      {
        expiresIn: configs.auth.refreshTokenExpireIn,
      }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    redis.set(
      `refteshToken:${user.id}`,
      hashedRefreshToken,
      "EX",
      configs.auth.refreshTokenExpireIn
    );

    res.cookie("access-token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 9000000,
    });

    res.cookie("refresh-token", hashedRefreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 9000000,
    });

    return res.status(200).json({ message: "user login successfully" });
  } catch (error) {
    next(error);
  }
};


exports.me = async (req,res,next) => {
  try {

    const user = req.user

    return res.status(200).json(user)
    
  } catch (error) {
    next(error)
  }
}


exports.logout = async (req,res,next) => {
  try {

    const userId = req.user.id

    await redis.del(`refteshToken:${userId}`)

    res.clearCookie('access-token',{httpOnly:true})
    res.clearCookie('refresh-token',{httpOnly:true})

    
    return res.status(200).json({ message: "User logged out successfully" });

  } catch (error) {
    next(error)
  }
}