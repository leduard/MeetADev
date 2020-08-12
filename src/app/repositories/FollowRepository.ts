import { EntityRepository, Repository, getRepository } from "typeorm";

import User from "../models/User";
import Follow from "../models/Follow";

interface GetFollowersRepositoryResponse {
  currentPage: number;
  itemsPerPage: number;
  followersCount: number;
  followers: User[];
}

interface GetFollowingRepositoryResponse {
  currentPage: number;
  itemsPerPage: number;
  followingCount: number;
  following: User[];
}

@EntityRepository(Follow)
class FollowRepository extends Repository<Follow> {
  public async getFollowers(
    username: string,
    page: number = 1
  ): Promise<GetFollowersRepositoryResponse | {}> {
    const itemsPerPage = parseInt(process.env.ROUTES_ITEMS_PER_PAGE as any);
    page = page.toString() === "" ? 1 : page;

    const follows = await this.createQueryBuilder("follows")
      .leftJoinAndSelect("follows.user", "user")
      .leftJoinAndSelect("follows.follower", "follower")
      .where("user.username = :username", { username })
      .addOrderBy("follows.created_at", "ASC")
      .skip(page * itemsPerPage - itemsPerPage)
      .take(itemsPerPage)
      .getMany();

    const followersUsers = follows.map((follow) => {
      delete follow.follower.created_at;
      delete follow.follower.updated_at;

      return follow.follower;
    });

    const response: GetFollowersRepositoryResponse = {
      currentPage: page,
      itemsPerPage,
      followersCount: followersUsers.length,
      followers: followersUsers,
    };

    return followersUsers.length ? response : {};
  }

  public async getFollowing(
    username: string,
    page: number = 1
  ): Promise<GetFollowingRepositoryResponse | {}> {
    const itemsPerPage = parseInt(process.env.ROUTES_ITEMS_PER_PAGE as any);
    page = page.toString() === "" ? 1 : page;

    const following = await this.createQueryBuilder("follows")
      .leftJoinAndSelect("follows.user", "user")
      .leftJoinAndSelect("follows.follower", "follower")
      .where("follower.username = :username", { username })
      .addOrderBy("follows.created_at", "ASC")
      .skip(page * itemsPerPage - itemsPerPage)
      .take(itemsPerPage)
      .getMany();

    const followingUsers = following.map((follow) => {
      delete follow.user.created_at;
      delete follow.user.updated_at;

      return follow.user;
    });

    const response: GetFollowingRepositoryResponse = {
      currentPage: page,
      itemsPerPage,
      followingCount: followingUsers.length,
      following: followingUsers,
    };

    return followingUsers.length ? response : {};
  }
}

export default FollowRepository;
