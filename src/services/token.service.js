import createHttpError from "http-errors";
import UserModel from "../models/userModel.js";
import { sign } from "../utils/token.util.js";
import bcrypt from "bcrypt";

export const generateToken = async (payload, expiresIn, secret) => {
  let token = await sign(payload, expiresIn, secret);
  return token;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  //check if user exists
  if (!user) throw createHttpError.NotFound("User does not exist.");

  //compare passwords
  let passwordMatches = await bcrypt.compare(password, user.password);

  //check if password matches
  if (!passwordMatches) throw createHttpError.NotFound("Invalid credentials.");

  return user;
};
