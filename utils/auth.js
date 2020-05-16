import jwt from "jsonwebtoken";
import { User } from "../resources/user/user.model";

const jwtSecret = "LearnEverything";

export const newToken = (user) => {
  return jwt.sign({ id: user.id });
};
