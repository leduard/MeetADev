import { Router } from "express";
import { getCustomRepository } from "typeorm";

import CreateFollowService from "../../app/services/CreateFollowService";

import CustomFollowRepository from "../../app/repositories/FollowRepository";

import AuthMiddleware from "../../app/middleware/auth";

const followsRouter = Router();

followsRouter.use(AuthMiddleware);

followsRouter.get("/:username/followers", async (request, response) => {
  try {
    const { username } = request.params;
    const { page } = request.query;
    const followRepo = getCustomRepository(CustomFollowRepository);

    const userFollowers = await followRepo.getFollowers(
      username,
      parseInt(page as any) || 1
    );

    return response.json(userFollowers);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

followsRouter.get("/:username/following", async (request, response) => {
  try {
    const { username } = request.params;
    const { page } = request.query;

    const followRepo = getCustomRepository(CustomFollowRepository);

    const userFollowers = await followRepo.getFollowing(
      username,
      parseInt(page as any) || 1
    );

    return response.json(userFollowers);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

followsRouter.post("/:username", async (request, response) => {
  try {
    const { username } = request.params;
    const { id: authenticated_user } = request.user;

    const createFollow = new CreateFollowService();

    const follow = await createFollow.execute({ username, authenticated_user });

    return response.json(follow);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default followsRouter;
