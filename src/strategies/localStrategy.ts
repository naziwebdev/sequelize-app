import { User } from "../db";
import bcrypt from "bcryptjs";
import { Strategy } from "passport-local";

export const localStrategy = new Strategy(
  async (username: string, password: string, done: any) => {
    const user = await User.findOne({ where: { username }, raw: true });

    if (!user) return done(null, false);

    const isValidPassword = await bcrypt.compare(password, user?.password!);

    if (!isValidPassword) return done(null, false);

    return done(null, user);
  }
);
