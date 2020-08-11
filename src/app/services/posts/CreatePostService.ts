import { getRepository } from "typeorm";

import AppError from "../../errors/appError";

import Post from "../../models/Post";
import User from "../../models/User";

interface CreatePostRequest {
  content: string;
  user_id: string;
}

class CreatePostService {
  public async execute({ content, user_id }: CreatePostRequest): Promise<Post> {
    const postRepo = getRepository(Post);
    const userRepo = getRepository(User);

    const user = await userRepo.findOne({ where: { id: user_id } });

    if (!user) throw new AppError("User not found");

    const post = postRepo.create({ content, user });
    await postRepo.save(post);

    delete post.user.name;
    delete post.user.email;
    delete post.user.password;
    delete post.user.created_at;
    delete post.user.updated_at;

    return post;
  }
}

export default CreatePostService;
