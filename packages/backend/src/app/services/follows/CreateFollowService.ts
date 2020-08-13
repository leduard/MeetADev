import { getRepository } from "typeorm";

import AppError from "../../errors/appError";

import Follow from "../../models/Follow";
import User from "../../models/User";

interface CreateFollowRequest {
  username: string;
  authenticated_user: string;
}

class CreateFollowService {
  public async execute({
    username,
    authenticated_user,
  }: CreateFollowRequest): Promise<Follow> {
    const followRepo = getRepository(Follow);
    const userRepo = getRepository(User);

    const userToBeFollowed = await userRepo.findOne({ username });

    if (!userToBeFollowed) throw new AppError(`User ${username} not found`);
    if (userToBeFollowed.id === authenticated_user)
      throw new AppError(`You can't follow youself`);

    const alreadyFollowing = await followRepo.findOne({
      where: {
        user: userToBeFollowed,
        follower: authenticated_user,
      },
    });

    if (alreadyFollowing) throw new AppError(`Already following this user`);

    const follow = followRepo.create({
      user: { id: userToBeFollowed.id },
      follower: { id: authenticated_user },
    });

    await followRepo.save(follow);

    return follow;
  }
}

export default CreateFollowService;
