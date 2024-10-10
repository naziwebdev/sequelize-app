const svgCaptcha = require("svg-captcha");
const redis = require("../redis");
const uuidv4 = require("uuid").v4;

exports.get = async (req, res, next) => {
  try {
    const captcha = svgCaptcha.create({ size: 4, noise: 5 });

    const uuid = uuidv4();

    await redis.set(
      `captcha:${uuid}`,
      captcha.text.toLowerCase(),
      "EX",
      60 * 2
    );

    return res.json({ uuid, captcha: captcha.data });
  } catch (error) {
    next(error);
  }
};
