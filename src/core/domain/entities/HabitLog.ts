export class HabitLog {
  private constructor(
    readonly id: string,
    readonly habitId: string,
    readonly doneAt: Date
  ) {}

  static create(id: string, habitId: string, doneAt: Date) {
    return new HabitLog(id, habitId, doneAt);
  }
}
