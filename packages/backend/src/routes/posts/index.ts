import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import Post from '../../app/models/Post';
import Like from '../../app/models/Like';

import CreatePostService from '../../app/services/posts/CreatePostService';
import DeletePostService from '../../app/services/posts/DeletePostService';

import CustomPostRepository from '../../app/repositories/PostRepository';

import AppError from '../../app/errors/appError';
import AuthMiddleware from '../../app/middleware/auth';

const postsRouter = Router();

postsRouter.use(AuthMiddleware);

postsRouter.get('/', async (request, response) => {
  try {
    let { page } = request.query;
    const { id: authenticated_user } = request.user;

    const postsRepo = getCustomRepository(CustomPostRepository);

    const posts = await postsRepo.all(
      parseInt(page as any) || 1,
      authenticated_user
    );

    return response.json(posts);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

postsRouter.post('/', async (request, response) => {
  try {
    const { content } = request.body;
    const { id: user_id } = request.user;

    const createPost = new CreatePostService();

    const post = await createPost.execute({ content, user_id });

    return response.json(post);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

postsRouter.delete('/:id', async (request, response) => {
  try {
    const deletePost = new DeletePostService();
    const { id } = request.params;
    const { id: authenticated_user } = request.user;

    await deletePost.execute({ id, authenticated_user });

    return response.status(200).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

postsRouter.post('/like/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const like = await getRepository(Like)
      .createQueryBuilder('likes')
      .insert()
      .into('posts_likes')
      .values({
        user_id: user_id,
        post_id: id,
      })
      .execute();

    return response.json(like);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

postsRouter.delete('/like/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const like = await getRepository(Like)
      .createQueryBuilder('likes')
      .delete()
      .where('user_id = :user', { user: user_id })
      .andWhere('post_id = :id', { id })
      .execute();

    return response.json({});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default postsRouter;
