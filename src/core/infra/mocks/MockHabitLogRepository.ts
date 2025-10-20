import { IHabitLogRepository } from "../../domain/repositories/IHabitLogRepository";
import { HabitLog } from "../../domain/entities/HabitLog";

export class MockHabitLogRepository implements IHabitLogRepository {
  public static instance: MockHabitLogRepository;
  private logs: HabitLog[] = [];

  private constructor() {}

  public static getIstance(): MockHabitLogRepository {
    if (!MockHabitLogRepository.instance) {
      MockHabitLogRepository.instance = new MockHabitLogRepository();
    }
    return MockHabitLogRepository.instance;
  }

  async save(habit: HabitLog): Promise<void> {
    this.logs.push(habit);
  }

  async findAll(habitId: string): Promise<HabitLog[] | null> {
    return this.logs.filter((log) => log.habitId == habitId) || null;
  }
}
