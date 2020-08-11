import { EntityRepository, Repository } from "typeorm";
import Post from "../models/Post";

interface AllRepositoryResponse {
  currentPage: number;
  itemsPerPage: number;
  posts: Post[];
  postsCount: number;
}

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  public async all(page: number = 1): Promise<AllRepositoryResponse | {}> {
    const itemsPerPage = parseInt(process.env.ROUTES_ITEMS_PER_PAGE as any);
    page = page.toString() === "" ? 1 : page;

    const [allPosts, postsCount] = await this.findAndCount({
      loadRelationIds: true,
      take: itemsPerPage,
      skip: page * itemsPerPage - itemsPerPage,
    });

    const response: AllRepositoryResponse = {
      postsCount,
      currentPage: page,
      itemsPerPage,
      posts: allPosts,
    };

    return allPosts.length ? response : {};
  }
}

export default PostRepository;
