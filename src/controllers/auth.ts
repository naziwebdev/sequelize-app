import { Request, Response, NextFunction } from "express";
import { User } from "../associateModels";
import { registerTypes , IUser} from "../tsTypes/user.types";
import registerSchema from "../validators/registerSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import redis from "../redis";
import configs from "../configs";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, email, password } = req.body as registerTypes;

    await registerSchema.validate(
      { name, username, email, password },
      { abortEarly: false }
    );

    const existUser = await User.findOne({
      where: {
        [Op.or]: [
          { email},
          { username},
        ],
      },
      raw:true
    });

  
    if (existUser) {
      return res.status(400).json({ message: "user register already" });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password!, 12);
    }

    const users = await User.count();

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: users > 0 ? "user" : "admin",
      provider: password ?  "local" : "google",
    });

    const accessToken = jwt.sign(
      { userID: user.id },
      configs.auth.accessTokenSecretKey!,
      {
        expiresIn: configs.auth.accessTokenExpireIn,
      }
    );

    const refreshToken = jwt.sign(
      { userID: user.id },
      configs.auth.refreshTokenAccessKey!,
      {
        expiresIn: configs.auth.refreshTokenExpireIn,
      }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    redis.set(
      `refteshToken:${user.id}`,
      hashedRefreshToken,
      "EX" as any,
      configs.auth.refreshTokenExpireIn!
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
    next(error)
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {


    const user = req.user as IUser


    const accessToken = jwt.sign(
      { userID: user?.id },
      configs.auth.accessTokenSecretKey!,
      {
        expiresIn: configs.auth.accessTokenExpireIn,
      }
    );

    const refreshToken = jwt.sign(
      { userID: user.id },
      configs.auth.refreshTokenAccessKey!,
      {
        expiresIn: configs.auth.refreshTokenExpireIn,
      }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    redis.set(
      `refteshToken:${user.id}`,
      hashedRefreshToken,
      "EX" as any,
      configs.auth.refreshTokenExpireIn!
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
    next(error)
  }
};
