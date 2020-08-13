import { EntityRepository, Repository, getRepository } from "typeorm";

import User from "../models/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async getUser(username: string): Promise<User | undefined> {
    const user = await this.findOne({
      select: ["id", "name", "username", "created_at"],
      loadEagerRelations: true,
      where: { username },
    });

    return user;
  }
}

export default UserRepository;
