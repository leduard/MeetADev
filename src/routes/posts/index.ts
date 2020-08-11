import { Router } from "express";
import { getCustomRepository, getRepository } from "typeorm";

import Post from "../../models/Post";

import CreatePostService from "../../services/posts/CreatePostService";

import CustomPostRepository from "../../repositories/PostRepository";

import AppError from "../../errors/appError";
import AuthMiddleware from "../../middleware/auth";

const postsRouter = Router();

postsRouter.use(AuthMiddleware);

postsRouter.get("/", async (request, response) => {
  try {
    const postsRepo = getCustomRepository(CustomPostRepository);
    let { page } = request.query;

    const posts = await postsRepo.all(parseInt(page as any) || 1);

    return response.json(posts);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

postsRouter.post("/", async (request, response) => {
  try {
    const { content } = request.body;
    const { id: user_id } = request.user;

    const createPost = new CreatePostService();

    const post = await createPost.execute({ content, user_id });

    return response.json(post);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

postsRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const postRepo = getRepository(Post);

    const { affected } = await postRepo.delete({ id });

    if (!affected) throw new AppError("Post not found");

    return response.status(200).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default postsRouter;
