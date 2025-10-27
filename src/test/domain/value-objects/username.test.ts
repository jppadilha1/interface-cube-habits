import { Username } from "../../../core/domain/value-objects/username";

describe("username", () => {
  it("Should create a valid username", () => {
    const username = Username.create("joaop");
    expect(username.value).toBe("joaop");
  });

  it("Should return error if invalid username", () => {
    expect(() => Username.create("jp")).toThrow();
  });
});
