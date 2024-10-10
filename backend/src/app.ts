import dotenv from "dotenv";
import express from "express";
import postRouter from "./routes/post.routes";
import userRouter from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import { errorHandler } from "./middleware/error.middleware";
import connectDB from "./config/db";
import { corsMiddleware } from "./middleware/cors.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(errorHandler);
app.use(corsMiddleware);

connectDB();

// Routes
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
