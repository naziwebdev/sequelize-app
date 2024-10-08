import redis from "../redis";
import { Request, Response, NextFunction } from "express";
import { captchaSchema } from "../validators/loginSchema";

export const validateCaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { captcha, uuid } = req.body as { captcha: string; uuid: string };

    await captchaSchema.validate({ captcha, uuid }, { abortEarly: false });

    const cacheCaptcha = await redis.get(`captcha:${uuid}`);

    if (cacheCaptcha) {
      await redis.del(`captcha:${uuid}`);
    }

    if (cacheCaptcha !== captcha.toLowerCase()) {
      return res.status(401).json({ message: "captcha is invalid" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
