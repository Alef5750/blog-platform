"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
// Create a new post
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new post_model_1.default(req.body);
        yield post.save();
        res.status(201).json(post);
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
// Get all posts
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find().populate("author", "username");
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
exports.getPosts = getPosts;
// Get a single post by ID
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id).populate("author", "username");
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        next(error);
    }
});
exports.getPost = getPost;
// Update a post
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePost = updatePost;
// Delete a post
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
// Add a comment to a post
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        post.comments.push(req.body);
        yield post.save();
        res.status(201).json(post);
    }
    catch (error) {
        next(error);
    }
});
exports.addComment = addComment;
