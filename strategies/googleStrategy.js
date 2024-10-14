const GoogleStrategy = require("passport-google-oauth20");
const { default: slugify } = require("slugify");
const { User } = require("../db");
const configs = require("../configs");

module.exports = new GoogleStrategy(
  {
    clientID: configs.google.clientId,
    clientSecret: configs.google.clientSecret,
    callBackURL: `${configs.domin}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;

      let user = await User.findOne({ where: { email } });

      if (user) return done(null, user);

      const name = `${profile.name.givenName}${profile.name.familyName}`;
      const username =
        slugify(name, { lower: true }).replace(/[\.-]/g, "") +
        Math.floor(1000 + Math.random() * 9000);

      await User.create({
        name,
        username,
        email,
        provider: "google",
      });

      done(null, user);
    } catch (error) {
      throw error;
    }
  }
);
