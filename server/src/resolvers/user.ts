import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { FieldError } from "./Types";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Query(() => User, { nullable: true })
  user(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { id });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("credentials") { username, password }: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          },
        ],
      };
    }
    if (password.length <= 7) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 7",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    const user = em.create(User, { username, password: hashedPassword });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already exists",
            },
          ],
        };
      }
      console.error("message", err.message);
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("credentials") { username, password }: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username doesn't exist",
          },
        ],
      };
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return {
        errors: [
          {
            field: "username",
            message: "credentials are invalid ",
          },
        ],
      };
    }

    return { user };
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id") id: number,
    @Arg("username") username: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    if (typeof username !== undefined) {
      user.username = username;
      await em.persistAndFlush(user);
    }
    return user;
  }
}
