import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { searchUser as searchUsersService } from "../services/user.service.js";

export const searchUsers = async (req, res, next) => {
  try {
    const keyword = decodeURIComponent(req.query.search);
    if (!keyword) {
      logger.error("Please add a search query first");
      throw createHttpError("Oops...Something went wrong!");
    }
    const users = await searchUsersService(keyword, req.user.userId);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
