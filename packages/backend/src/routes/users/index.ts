import { Router } from "express";
import { getCustomRepository } from "typeorm";

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
