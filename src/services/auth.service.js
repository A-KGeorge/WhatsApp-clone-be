import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";

const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  //check if fields are empty

  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields");
  }

  //check name length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your name length is between 2 and 16 characters"
    );
  }

  if (status && status.length > 62) {
    throw createHttpError.BadRequest(
      "Please make sure your status is less than 64 characters"
    );
  }

  //checks if email is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide a valid email address."
    );
  }

  //check if user already exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "Please try again with a different email address. This email address is already in use."
    );
  }

  //check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure that your password is between 6 and 128 characters"
    );
  }

  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();

  return user;
};
