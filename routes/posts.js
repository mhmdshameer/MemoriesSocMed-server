import express from "express";
import {commentPost, getSearchPosts,getPost, getPosts, createPost, updatePost, deletePost, likePost} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search",getSearchPosts);
router.get("/",getPosts);
router.get("/:id",getPost);
router.post("/",auth,createPost);
router.patch("/:id",auth,updatePost);
router.delete("/:id",auth,deletePost);
router.patch("/:id/likePost",auth,likePost)
router.post("/:id/commentPost",auth,commentPost)

export default router;