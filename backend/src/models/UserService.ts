import type { NewUserInput } from "@/resolvers/UserResolver";
import { Role, User } from "../entities/User";

export default class UserService implements IUserService {
  find(): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<User[]> {
    return User.find();
  }

  async findByMail(mail: string): Promise<User | null> {
    return User.findOne({
      select: ["id", "mail", "hashedPassword", "name", "roles"],
      where: { mail },
      relations: ["readScenarios"],
    });
  }

  async create(data: NewUserInput): Promise<User> {
    const user = User.create({
      ...data,
      hashedPassword: data.password,
      roles: [Role.USER],
      readScenarios: [],
    });
    return user.save();
  }
}

export interface IUserService {
  find(): Promise<User>;
  findAll(): Promise<User[]>;
  findByMail(mail: string): Promise<User | null>;
  create(data: NewUserInput): Promise<User>;
}
