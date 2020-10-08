import { Router } from "express";
import { getCustomRepository, getRepository, SelectQueryBuilder } from "typeorm";

import Follow from "../../app/models/Follow";

import CreateFollowService from "../../app/services/follows/CreateFollowService";
import DeleteFollowService from "../../app/services/follows/DeleteFollowService";

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

    const userFollowers = await followRepo.getFollowing({
      username,
      page: parseInt(page as any) || 1,
    });

    return response.json(userFollowers);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

followsRouter.get("/:username/follow/:username2", async (request, response) => {
  try {
    const { username, username2 } = request.params;
    
    const followRepo = getRepository(Follow);

    const userFollowers = await followRepo.findOne({
      join: {
        alias: 'follows',
        leftJoin: {
          user: 'follows.user',
          follower: 'follows.follower',
        }
      },
      where: (qb: SelectQueryBuilder<Follow>) => {
        qb.where('user.username = :username2', { username2 })
          .andWhere('follower.username = :username', { username })
      }
    });

    return response.json({ following: !!userFollowers?.id });
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

followsRouter.delete("/:username", async (request, response) => {
  try {
    const { username } = request.params;
    const { id: authenticated_user } = request.user;

    const deleteFollow = new DeleteFollowService();

    await deleteFollow.execute({ username, authenticated_user });

    return response.status(200).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default followsRouter;
