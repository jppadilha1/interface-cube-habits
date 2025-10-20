import { Email } from "../../../domain/value-objects/email";

describe("Email", () => {
  it("Should create a valid email", () => {
    const email = Email.create("teste@exemplo.com");
    expect(email.value).toBe("teste@exemplo.com");
  });

  it("Should return error if invalid email", () => {
    expect(() => Email.create("testeerror")).toThrow();
  });
});
