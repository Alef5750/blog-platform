import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  loginUser,
} from "../controllers/user.controller";
import { auth } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUsers);
userRouter.get("/:username", auth, getUser);

export default userRouter;
