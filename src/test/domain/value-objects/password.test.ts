import { Password } from "../../../core/domain/value-objects/password";

describe("Password", () => {
  it("should create a valid password", () => {
    const value = "Valid12!";
    const pass = Password.create(value);
    if (pass) {
      expect(pass.value).toBe(value);
    }
  });

  it("should throw an error if password has less than 8 characters", () => {
    expect(() => Password.create("123")).toThrow();
  });

  it("should throw an error if password has no uppercase letter", () => {
    expect(() => Password.create("12345678")).toThrow();
  });

  it("should throw an error if password has no lowercase letter", () => {
    expect(() => Password.create("1234567A")).toThrow();
  });

  it("should throw an error if password has no number", () => {
    expect(() => Password.create("abcDEFGH")).toThrow();
  });

  it("should throw an error if password has no special character", () => {
    expect(() => Password.create("abcDEF12")).toThrow();
  });
});
