import { MockUserRepository } from "../../../infra/mocks/MockUserRepository";
import { User } from "../../../domain/entities/User";
import { Username } from "../../../domain/value-objects/username";
import { Email } from "../../../domain/value-objects/email";
import { Password } from "../../../domain/value-objects/password";

describe("MockUserRepository", () => {
  it("should not throw when updating a non-existent user", async () => {
    const userRepository = MockUserRepository.getInstance();
    const user = User.create(
      "1",
      Username.create("Romário"),
      Email.create("goat@gmail.com"),
      Password.create("senha$Segura123")
    );

    await expect(userRepository.update(user)).resolves.not.toThrow();
  });
  it("Should save a user correctly", async () => {
    const userRepository = MockUserRepository.getInstance();
    const user = User.create(
      "1",
      Username.create("Romário"),
      Email.create("goat@gmail.com"),
      Password.create("senha$Segura123")
    );
    await expect(userRepository.save(user)).resolves.not.toThrow();

    const userData = await userRepository.findByEmail("goat@gmail.com");
    expect(userData).toBeInstanceOf(User);
  });
});
