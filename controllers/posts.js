import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getSearchPosts = async (req,res) =>{
    const {searchQuery, tags} = req.query
    console.log(req.query);

    try {
      const title = new RegExp(searchQuery, 'i');
      console.log("title:",title)
      console.log("tags:",tags)
      const posts = await PostMessage.find({ $or: [{title}, {tags: { $in: tags.split(',')}}]})
      res.json({data: posts})
    } catch (error) {
      console.log(error)
      res.status(404).json({message:error.message})
    }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    console.log(newPost);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error saving post:", error.message);
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("NO POST WITH THIS ID");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("NO POST WITH THIS ID");
  await PostMessage.findByIdAndDelete(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("NO POST WITH THIS ID");
  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const likedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(likedPost);
};

export default router;
