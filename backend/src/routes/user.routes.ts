import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *    post:
 *      summary: creates a new user
 *      description: when a user submits the registration form, a new user is created
 *      tags:
 *        - Users
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *          properties:
 *               username:
 *                 type: string
 *                 description: Unique username for the account
 *                 example: "john_doe"
 *                 minLength: 3
 *                 maxLength: 30
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Unique email address for the account
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: User's password (will be hashed)
 *                 format: password
 *                 minLength: 8
 *                 example: "strongP@ssw0rd"
 *               profile:
 *                 type: object
 *                 description: Additional profile information
 *                 properties:
 *                   bio:
 *                     type: string
 *                     description: User's biography or description
 *                     example: "Software developer passionate about web technologies"
 *                     maxLength: 500
 *                   socialLinks:
 *                     type: array
 *                     description: List of social media profile URLs
 *                     items:
 *                       type: string
 *                       format: uri
 *                     example: ["https://twitter.com/johndoe", "https://github.com/johndoe"]
 *      security:
 *          -cookieAuth: []
 *      responses:
 *          200:
 *            description: new user created successfully
 *          401:
 *            description: failed to create user
 *          403:
 *            description: No permissions
 *          404:
 *            description: Not found
 *
 */
userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:username", authMiddleware, getUser);

export default userRouter;
