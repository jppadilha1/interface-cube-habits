export class Password {
  private constructor(readonly value: string) {}

  static create(pass: string): Password {
    this.validate(pass);
    return new Password(pass);
  }

  private static validate(pass: string): boolean {
    if (pass.length < 8) {
      throw new Error("The password must be at least 8 characters long");
    } else if (!/[A-Z]/.test(pass)) {
      throw new Error(
        "The password must contain at least one uppercase letter"
      );
    } else if (!/[a-z]/.test(pass)) {
      throw new Error(
        "The password must contain at least one lowercase letter"
      );
    } else if (!/[0-9]/.test(pass)) {
      throw new Error("The password must contain at least one number");
    } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pass)) {
      throw new Error(
        "The password must contain at least one special character"
      );
    }
    return true;
  }
}
