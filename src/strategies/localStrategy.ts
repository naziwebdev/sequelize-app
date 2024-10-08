import { User } from "../associateModels";
import bcrypt from "bcryptjs";
import { loginLocalSchema } from "../validators/loginSchema";
import { Strategy } from "passport-local";

export const localStrategy = new Strategy(
  async (username: string, password: string, done: any) => {
    try {
      await loginLocalSchema.validate({ username, password }, { abortEarly: false });
      const user = await User.findOne({ where: { username }, raw: true });

      if (!user) return done(null, false);

      const isValidPassword = await bcrypt.compare(password, user?.password!);

      if (!isValidPassword) return done(null, false);

      return done(null, user);
    } catch (error) {
      throw error;
    }
  }
);
