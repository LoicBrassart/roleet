import * as argon2 from "argon2";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Roles, User } from "../entities/User";
import type CustomContext from "../types/CustomContext";

dotenv.config();

@InputType()
class NewUserInput implements Partial<User> {
  @Field()
  mail: string;

  @Field()
  password: string;

  @Field()
  name: string;
}

@InputType()
class UserInput {
  @Field()
  mail: string;

  @Field()
  password: string;
}

function setCookie(ctx: CustomContext, key: string, value: string) {
  if (!process.env.COOKIE_TTL) throw new Error("Missing ttl conf key!");
  const myDate = new Date();
  const expiryTStamp = myDate.getTime() + Number(process.env.COOKIE_TTL);
  myDate.setTime(expiryTStamp);
  ctx.res.setHeader(
    "Set-Cookie",
    `${key}=${value};secure;httpOnly;SameSite=Strict;expires=${myDate.toUTCString()}`,
  );
}

function getUserPublicProfile(user: User) {
  return {
    id: user.id,
    name: user.name,
    roles: user.roles,
    readScenarios: user.readScenarios.map((scen) => `${scen.id}`),
  };
}

function getUserTokenContent(user: User) {
  return {
    id: user.id,
    mail: user.mail,
    name: user.name,
    roles: user.roles,
  };
}

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await User.find();
  }

  @Mutation(() => String)
  async login(@Arg("data") userData: UserInput, @Ctx() context: CustomContext) {
    try {
      if (!process.env.JWT_SECRET) throw new Error("Missing env variable!");
      const user = await User.findOne({
        where: { mail: userData.mail },
        relations: ["readScenarios"],
      });
      if (!user) throw new Error("User not found!");

      const isValid = await argon2.verify(
        user.hashedPassword,
        userData.password,
      );
      if (!isValid) throw new Error();

      const token = jwt.sign(getUserTokenContent(user), process.env.JWT_SECRET);
      setCookie(context, "roleetAuthToken", token);
      return JSON.stringify(getUserPublicProfile(user));
    } catch (err) {
      throw new Error(`Failed to login: ${err.message}`);
    }
  }

  @Mutation(() => String)
  async logout(@Ctx() context: CustomContext) {
    try {
      setCookie(context, "roleetAuthToken", "");
      return "Goodbye, your auth cookie was cleared";
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => String)
  async signup(
    @Arg("data") userData: NewUserInput,
    @Ctx() context: CustomContext,
  ) {
    try {
      if (!process.env.JWT_SECRET) throw new Error();

      const hashedPassword = await argon2.hash(userData.password);
      const user = await User.save({
        mail: userData.mail,
        name: userData.name,
        hashedPassword,
        roles: [Roles.USER],
      });
      const token = jwt.sign(getUserTokenContent(user), process.env.JWT_SECRET);
      setCookie(context, "roleetAuthToken", token);
      return JSON.stringify(getUserPublicProfile(user));
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

export default UserResolver;
