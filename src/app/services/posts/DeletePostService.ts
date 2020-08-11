import { getRepository } from "typeorm";

import AppError from "../../errors/appError";

import Post from "../../models/Post";

interface DeletePostRequest {
  id: string;
  authenticated_user: string;
}

class DeletePostService {
  public async execute({
    id,
    authenticated_user,
  }: DeletePostRequest): Promise<void> {
    const postRepo = getRepository(Post);

    const { affected } = await postRepo.delete({
      id,
      user: { id: authenticated_user },
    });

    if (!affected) throw new AppError("Post not found");
  }
}

export default DeletePostService;
