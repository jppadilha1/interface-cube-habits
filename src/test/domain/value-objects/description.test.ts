import { Description } from "../../../core/domain/value-objects/description";

describe("Description", () => {
  it("Should create a valid description", () => {
    const description = Description.create("Ir à academia 3x por semana");
    expect(description.value).toBe("Ir à academia 3x por semana");
    expect(description.value.length).toBeGreaterThan(20);
  });

  it("Should Throw error if description length less than 20 characteres", () => {
    expect(() => Description.create("ler")).toThrow();
  });
});
