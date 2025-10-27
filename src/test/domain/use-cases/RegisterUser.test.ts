import { User } from "../../../core/domain/entities/User";
import { MockUserRepository } from "../../../core/infra/mocks/MockUserRepository";
import { RegisterUser } from "../../../core/domain/use-cases/RegisterUser";

describe("RegisterUser Use Case", () => {
  it("should register a new user", async () => {
    const registerUser = new RegisterUser(MockUserRepository.getInstance());

    expect(
      await registerUser.execute({
        name: "TesteName",
        email: "teste@gmail.com",
        password: "Teste$1234",
      })
    ).toBeInstanceOf(User);
  });
  it("should throw if User already exists", async () => {
    const registerUser = new RegisterUser(MockUserRepository.getInstance());

    await expect(
      registerUser.execute({
        name: "TesteName",
        email: "teste@gmail.com",
        password: "Teste$1234",
      })
    ).rejects.toThrow("User already exists");
  });
  it("should throw if password invalid", async () => {
    const registerUser = new RegisterUser(MockUserRepository.getInstance());

    await expect(
      registerUser.execute({
        name: "TesteName",
        email: "teste2@gmail.com",
        password: "123456",
      })
    ).rejects.toThrow(
      "The password must contain at least one uppercase letter"
    );
  });
});
