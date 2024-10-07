import { Request } from "express";

export type registerTypes = {
  name: string;
  username: string;
  email: string;
  password?: string;
};


export interface IUser extends Request{
  id: number;
  name: string;
  avatar?: string;
  username: string;
  email: string;
  role: string;
  provider?: string;
  password?: string;
}
