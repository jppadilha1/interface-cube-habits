import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

export class LoginUser {
  constructor(readonly userRepository: IUserRepository) {}

  async execute(params: { email: string; password: string }): Promise<User> {
    const { email, password } = params;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await this.comparePassword(
      password,
      user.password.value
    );

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return user;
  }

  private async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return `hashed_${password}` === hashedPassword;
  }
}
