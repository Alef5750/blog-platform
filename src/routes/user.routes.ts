import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:username", getUser);

export default router;
