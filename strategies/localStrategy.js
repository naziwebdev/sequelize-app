const {User} = require('../db')
const bcrypt = require("bcryptjs");
const { loginLocalSchema } = require("../validators/loginSchema");
const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy(async (username, password, done) => {
  try {
    await loginLocalSchema.validate(
      { username, password },
      { abortEarly: false }
    );
    const user = await User.findOne({ where: { username }, raw: true });

    if (!user) return done(null, false);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return done(null, false);

    return done(null, user);
  } catch (error) {
    throw error;
  }
});
