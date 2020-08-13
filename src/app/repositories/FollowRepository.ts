import { EntityRepository, Repository, getRepository } from "typeorm";

import User from "../models/User";
import Follow from "../models/Follow";

interface GetFollowersRepositoryResponse {
  currentPage: number;
  itemsPerPage: number;
  followersCount: number;
  followers: User[];
}

interface GetFollowingRequest {
  username?: string;
  id?: string;
  page?: number;
}

interface GetFollowingRepositoryResponse {
  currentPage?: number;
  itemsPerPage?: number;
  followingCount?: number;
  following?: User[];
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

  public async getFollowing({
    username,
    id,
    page = 1,
  }: GetFollowingRequest): Promise<GetFollowingRepositoryResponse> {
    const itemsPerPage = parseInt(process.env.ROUTES_ITEMS_PER_PAGE as any);
    page = page.toString() === "" ? 1 : page;

    const following = await this.createQueryBuilder("follows")
      .leftJoinAndSelect("follows.user", "user")
      .leftJoinAndSelect("follows.follower", "follower")
      .where(`follower.${username ? "username" : "id"} = :query`, {
        query: username ? username : id,
      })
      .addOrderBy("follows.created_at", "ASC")
      .skip(id ? 0 : page * itemsPerPage - itemsPerPage)
      .take(id ? 0 : itemsPerPage)
      .getMany();

    const followingUsers = following.map((follow) => {
      delete follow.user.created_at;
      delete follow.user.updated_at;

      if (id) {
        delete follow.user.followers_count;
        delete follow.user.following_count;
      }

      return follow.user;
    });

    if (id) return { following: followingUsers };

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
