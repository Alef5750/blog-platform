"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
// Basic CORS middleware
exports.corsMiddleware = (0, cors_1.default)({
    origin: "*", // Allow all origins - replace with your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
    maxAge: 86400, // Cache preflight request results for 24 hours (in seconds)
});
