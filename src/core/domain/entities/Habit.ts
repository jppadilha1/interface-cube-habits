import { Description } from "../value-objects/description";

export class Habit {
  private constructor(
    readonly id: string,
    readonly userId: string,
    readonly description: Description,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  static create(
    id: string,
    userId: string,
    description: Description,
    createdAt: Date,
    updatedAt: Date
  ): Habit {
    return new Habit(id, userId, description, createdAt, updatedAt);
  }
}
