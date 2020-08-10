import { Router } from "express";
import { getRepository } from "typeorm";

import Post from "../../models/Post";

import AuthMiddleware from "../../middleware/auth";

const postsRouter = Router();

postsRouter.use(AuthMiddleware);

postsRouter.get("/", async (request, response) => {
  try {
    const postsRepo = getRepository(Post);

    return response.json(await postsRepo.find());
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

postsRouter.post("/", async (request, response) => {
  try {
    const postRepo = getRepository(Post);

    const newPost = postRepo.create(request.body);
    const savedPost = await postRepo.save(newPost);

    return response.json(savedPost);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default postsRouter;
