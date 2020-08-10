import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "../errors/appError";

import User from "../models/User";

interface CreateUserRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    username,
    password,
  }: CreateUserRequest): Promise<User> {
    const userRepo = getRepository(User);

    const userEmailExists = await userRepo.findOne({ where: { email } });
    const userUsernameExists = await userRepo.findOne({ where: { username } });

    if (userEmailExists) throw new AppError("Email address already registered");
    if (userUsernameExists) throw new AppError("Username already in use");

    const hashedPass = await hash(password, 8);

    const user = userRepo.create({
      name,
      email,
      username,
      password: hashedPass,
    });
    await userRepo.save(user);

    return user;
  }
}

export default CreateUserService;
