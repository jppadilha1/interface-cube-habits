import { IUserRepository } from "../domain/repositories/IUserRepository";
import { LoginUser } from "../domain/use-cases/LoginUser";
import { RegisterUser } from "../domain/use-cases/RegisterUser";
import { MockUserRepository } from "../infra/mocks/MockUserRepository";

export function makeUserUseCases() {
  const userRepository: IUserRepository = MockUserRepository.getInstance();

  const registerUser = new RegisterUser(userRepository);
  const loginUser = new LoginUser(userRepository);

  return {
    registerUser,
    loginUser,
  };
}
