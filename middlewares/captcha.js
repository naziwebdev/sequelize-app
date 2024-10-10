const redis = require("../redis");
const { captchaSchema } = require("../validators/loginSchema");

exports.validateCaptcha = async (req, res, next) => {
  try {
    const { captcha, uuid } = req.body;

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
