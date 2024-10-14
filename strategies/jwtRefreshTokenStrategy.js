const { Strategy } = require("passport-jwt");
const bcrypt = require("bcryptjs");
const redis = require("../redis");
const { User } = require("../db");
const configs = require("../configs");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["refresh-token"];
  }

  return token;
};

module.exports = new Strategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: configs.auth.refreshTokenAccessKey,
    passReqToCallback: true,
  },
  async (req,payload, done) => {
    try {
      const refreshToken = cookieExtractor(req);

      const user = await User.findByPk(payload.userID, {
        raw: true,
        attributes: { exclude: ["password"] },
      });

      if (!user) return done(null, false);

      const cacheRefreshToken = await redis.get(`refteshToken:${user.id}`);

      if (!cacheRefreshToken) return done(null, false);

      const isValidRefreshToken = await bcrypt.compare(
        refreshToken,
        cacheRefreshToken
      );

      if (!isValidRefreshToken) return done(null, false);

      return done(null, user);
    } catch (error) {
      throw error;
    }
  }
);
