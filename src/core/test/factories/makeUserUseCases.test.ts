import { makeUserUseCases } from "../../factories/makeUserUseCases";

describe("makeUserUseCases", () => {
  it("should register and login user with use cases", () => {
    const useCases = makeUserUseCases();

    expect(useCases.registerUser).toBeDefined();
    expect(useCases.loginUser).toBeDefined();
  });
});
