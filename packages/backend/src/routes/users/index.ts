import { Router } from "express";
import { getCustomRepository, getRepository } from "typeorm";

import User from "../../app/models/User";

import CreateUserService from "../../app/services/CreateUserService";

import CustomUserRepository from "../../app/repositories/UserRepository";

import AuthMiddleware from "../../app/middleware/auth";

const usersRouter = Router();

usersRouter.get("/:username", async (request, response) => {
  const { username } = request.params;
  const userRepo = getCustomRepository(CustomUserRepository);

  const user = await userRepo.getUser(username);

  return response.json(user);
});

usersRouter.put("/", AuthMiddleware, async (request, response) => {
  try {
    const { name, email } = request.body;
    const { id: authenticated_user } = request.user;
    
    const userRepo = getRepository(User);

    const user = await userRepo.findOne({ where: { id: authenticated_user }, select: ['email', 'name'] });

    await userRepo.update({ id: authenticated_user }, {
      name: name ? name : user?.name,
      email: email ? email : user?.email,
    });

    const updatedUser = await userRepo.findOne({ where: { id: authenticated_user }});

    return response.json(updatedUser);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.delete("/", AuthMiddleware, async (request, response) => {
  try {
    const { id: authenticated_user } = request.user;
    
    const userRepo = getRepository(User);

    await userRepo.query(`ALTER TABLE users DISABLE TRIGGER ALL;`);
    await userRepo.query(`DELETE FROM users where id=$1;`, [authenticated_user])
    await userRepo.query(`ALTER TABLE users ENABLE TRIGGER ALL;`)

    return response.json();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, username, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, username, password });
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
