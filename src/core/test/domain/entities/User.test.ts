import { User } from "../../../domain/entities/User";
import { Email } from "../../../domain/value-objects/email";
import { Password } from "../../../domain/value-objects/password";
import { Username } from "../../../domain/value-objects/username";

describe("Entity User", () => {
  it("Should create a valid user", () => {
    const user = User.create(
      "1",
      Username.create("Romário"),
      Email.create("goat@gmail.com"),
      Password.create("senha$Segura123")
    );

    expect(user.id).toBe("1");
    expect(user.username.value).toBe("Romário");
    expect(user.email.value).toBe("goat@gmail.com");
    expect(user.password.value).toBe("senha$Segura123");
  });
});
