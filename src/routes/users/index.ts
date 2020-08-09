import { Router } from "express";
import { getRepository } from "typeorm";

import User from "../../models/User";

const usersRouter = Router();

usersRouter.get("/", async (request, response) => {
  const userRepo = getRepository(User);

  return response.json(await userRepo.find());
});

export default usersRouter;
