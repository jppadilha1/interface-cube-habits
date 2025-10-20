export class Username {
  private constructor(readonly value: string) {}

  static create(username: string): Username {
    this.validate(username);
    return new Username(username);
  }

  private static validate(username: string) {
    if (username.length < 5) {
      throw new Error("username must be at least 5 characters long");
    }
    return;
  }
}
