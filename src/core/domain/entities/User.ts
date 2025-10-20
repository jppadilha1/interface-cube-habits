import { Email } from "../value-objects/email";
import { Password } from "../value-objects/password";
import { Username } from "../value-objects/username";

export class User {
  private constructor(
    readonly id: string,
    readonly username: Username,
    readonly email: Email,
    readonly password: Password
  ) {}

  static create(
    id: string,
    username: Username,
    email: Email,
    password: Password
  ): User {
    return new User(id, username, email, password);
  }
}
