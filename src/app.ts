import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/blog_platform")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
