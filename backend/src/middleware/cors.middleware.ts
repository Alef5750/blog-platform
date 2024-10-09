import cors from "cors";

// Basic CORS middleware
export const corsMiddleware = cors({
  origin: "*", // Allow all origins - replace with your frontend URL in production
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable credentials (cookies, authorization headers, etc)
  maxAge: 86400, // Cache preflight request results for 24 hours (in seconds)
});
