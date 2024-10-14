const { Strategy } = require("passport-jwt");
const {User} = require('../db')
const configs = require("../configs");


const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access-token"];
  }

  console.log(token)
  return token;
};
module.exports = new Strategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: configs.auth.accessTokenSecretKey,
  },
  async (payload, done) => {
    try {

   
      const user = await User.findByPk(payload.userID, {
        raw: true,
        attributes: { exclude: ["password"] },
      });


      if (!user) return done(null, false);

      done(null, user);
    } catch (error) {
      throw error;
    }
  }
);
