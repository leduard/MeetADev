import { getRepository } from "typeorm";

import AppError from "../../errors/appError";

import Follow from "../../models/Follow";
import User from "../../models/User";

interface DeleteFollowRequest {
  username: string;
  authenticated_user: string;
}

class DeleteFollowService {
  public async execute({
    username,
    authenticated_user,
  }: DeleteFollowRequest): Promise<void> {
    const followRepo = getRepository(Follow);
    const userRepo = getRepository(User);

    const userToBeUnfollowed = await userRepo.findOne({ username });

    if (!userToBeUnfollowed) throw new AppError(`User ${username} not found`);
    if (userToBeUnfollowed.id === authenticated_user)
      throw new AppError(`You can't unfollow youself`);

    const userIsFollowing = await followRepo.findOne({
      where: {
        user: userToBeUnfollowed,
        follower: authenticated_user,
      },
    });

    if (!userIsFollowing) throw new AppError(`Not following this user`);

    const { affected } = await followRepo.delete({
      user: userToBeUnfollowed,
      follower: { id: authenticated_user },
    });

    console.log(
      `followed user: ${userToBeUnfollowed.id}`,
      `user logged: ${authenticated_user}`
    );

    if (!affected) throw new AppError("Follow not found");
  }
}

export default DeleteFollowService;
