import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { User } from "../associateModels";
import configs from "../configs";

export const jwtAccessTokenStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.auth.accessTokenSecretKey!,
  },
  async (payload, done) => {
    try {
      const user = await User.findByPk(payload.id, {
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
