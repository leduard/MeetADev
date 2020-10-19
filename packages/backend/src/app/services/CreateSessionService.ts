import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import AppError from "../errors/appError";

import User from "../models/User";

import authConfig from "../../config/auth";

interface CreateSessionRequest {
  username: string;
  password: string;
}

interface CreateSessionResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({
    username,
    password,
  }: CreateSessionRequest): Promise<CreateSessionResponse> {
    const userRepo = getRepository(User);

    const user = await await userRepo.findOne({
      select: ["id", "name", "username", "password"],
      where: { username },
    });

    if (!user) throw new AppError("Username or password incorrect", 401);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new AppError("Username or password incorrect", 401);

    const { secret, expire } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expire,
    });

    return { user, token };
  }
}

export default CreateSessionService;
