import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import postRouter from "./routes/post.routes";
import userRouter from "./routes/user.routes";
import { corsMiddleware } from "./middleware/cors.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(corsMiddleware);
// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/blog_platform";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
