import { Router } from 'express';
import { getRepository } from 'typeorm';

import Group from '../../app/models/Group';
import User from '../../app/models/User';

import AppError from '../../app/errors/appError';
import AuthMiddleware from '../../app/middleware/auth';

const groupsRouter = Router();

groupsRouter.use(AuthMiddleware);

groupsRouter.get('/', async (request, response) => {
  try {
    let { page } = request.query;
    const { id: authenticated_user } = request.user;

    const groups = await getRepository(Group)
      .createQueryBuilder('groups')
      .getMany();

    return response.json(groups);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

groupsRouter.post('/', async (request, response) => {
  try {
    const { name } = request.body;
    const { id: user_id } = request.user;

    const group = await getRepository(
      Group
    ).query(
      'INSERT INTO "groups"("id", "name", "created_at", "updated_at", "admin_id") VALUES (DEFAULT, $1, DEFAULT, DEFAULT, $2) RETURNING "id", "created_at", "updated_at"',
      [name, user_id]
    );

    return response.json(group);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

groupsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;
    const { id: authenticated_user } = request.user;

    const group = await getRepository(Group)
      .createQueryBuilder('groups')
      .update()
      .set({ name })
      .where('groups.id = :id', { id })
      .andWhere('groups.admin_id = :adm', { adm: authenticated_user })
      .execute();

    return response.json(group);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

groupsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { id: authenticated_user } = request.user;

    const group = await getRepository(Group)
      .createQueryBuilder('groups')
      .delete()
      .where('groups.id = :id', { id })
      .andWhere('groups.admin_id = :adm', { adm: authenticated_user })
      .execute();

    return response.status(200).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

groupsRouter.post('/join/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const group = await getRepository(Group)
      .createQueryBuilder('groups')
      .relation(Group, 'members')
      .of(id)
      .add(user_id);

    return response.json(group);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

groupsRouter.post('/leave/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const group = await getRepository(Group)
      .createQueryBuilder('groups')
      .relation(Group, 'members')
      .of(id)
      .remove(user_id);

    return response.json(group);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default groupsRouter;
