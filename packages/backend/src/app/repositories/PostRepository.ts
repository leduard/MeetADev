import { EntityRepository, Repository, getCustomRepository, getRepository } from "typeorm";

import Post from "../models/Post";
import User from "../models/User";

import CustomFollowRepository from "../../app/repositories/FollowRepository";

interface AllRepositoryResponse {
  currentPage: number;
  itemsPerPage: number;
  posts: Post[];
  postsCount: number;
}

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  public async all(
    page: number = 1,
    authenticated_user: string
  ): Promise<AllRepositoryResponse | {}> {
    const itemsPerPage = parseInt(process.env.ROUTES_ITEMS_PER_PAGE as any);
    page = page.toString() === "" ? 1 : page;

    const followRepo = getCustomRepository(CustomFollowRepository);
    const { following: followingUsers } = await followRepo.getFollowing({
      id: authenticated_user,
    });

    const followingUsersIds = followingUsers?.length
      ? followingUsers?.map((user) => user.id)
      : [];

    let [allPosts, postsCount] = await this.createQueryBuilder("posts")
      .leftJoinAndSelect("posts.user", "user")
      .where(
        `${
          followingUsersIds.length
            ? "user.id IN (:...followers)"
            : "false = true"
        }`,
        {
          followers: followingUsersIds,
        }
      ).orWhere('user.id = :authenticated_user_id', { 
          authenticated_user_id: authenticated_user
      })
      .addOrderBy("posts.created_at", "DESC")
      .skip(page * itemsPerPage - itemsPerPage)
      .take(itemsPerPage)
      .getManyAndCount();

    allPosts = allPosts.map((post) => {
      delete post.user.created_at;
      delete post.user.updated_at;

      return post;
    });

    const response: AllRepositoryResponse = {
      postsCount,
      currentPage: page,
      itemsPerPage,
      posts: allPosts,
    };

    return allPosts.length ? response : {};
  }

  public async getByUsename(page: number = 1, username: string) {
    const itemsPerPage = parseInt(process.env.ROUTES_ITEMS_PER_PAGE as any);
    page = page.toString() === "" ? 1 : page;

    const userRepo = getRepository(User);
    const user = await userRepo.findOne({username})

    let [allPosts, postsCount] = await this.findAndCount({
      where: { user },
      relations: ["user"],
      order: { created_at: "DESC" },
      take: itemsPerPage,
      skip: page * itemsPerPage - itemsPerPage,
    });

    const response: AllRepositoryResponse = {
      postsCount,
      currentPage: page,
      itemsPerPage,
      posts: allPosts,
    };

    return allPosts.length ? response : {};;
  }
}

export default PostRepository;
