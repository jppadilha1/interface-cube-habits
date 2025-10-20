export class Description {
  private constructor(readonly value: string) {}

  static create(description: string): Description {
    this.validate(description);
    return new Description(description);
  }

  private static validate(description: string) {
    if (description.length < 20) {
      // Parte do pressuposto de que um hábito precisa ser claro, e o mais descritivo possível
      // Regra de negócio.
      throw new Error("description must be at least 20 characters long");
    }
    return;
  }
}
