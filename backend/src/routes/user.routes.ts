import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:username", getUser);

export default userRouter;
