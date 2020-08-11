import { Router } from "express";
import { getRepository } from "typeorm";

import User from "../../app/models/User";

import CreateUserService from "../../app/services/CreateUserService";

const usersRouter = Router();

usersRouter.get("/", async (request, response) => {
  const userRepo = getRepository(User);

  return response.json(await userRepo.find());
});

usersRouter.get("/:id/posts", async (request, response) => {
  const { id } = request.params;
  const userRepo = getRepository(User);

  return response.json(
    await userRepo.find({ where: { id }, relations: ["posts"] })
  );
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
