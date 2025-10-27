import { Description } from "../../../core/domain/value-objects/description";
import { Habit } from "../../domain/entities/Habit";
import { IHabitRepository } from "../../domain/repositories/IHabitRepository";

export class MockHabitRepository implements IHabitRepository {
  private static instance: MockHabitRepository;
  private habits: Habit[] = [
    Habit.create(
      "1",
      "user1",
      Description.create("Beber 3l de água por dia"),
      new Date(),
      new Date()
    ),
    Habit.create(
      "2",
      "user1",
      Description.create("Fazer 30 minutos de exercício por dia"),
      new Date(),
      new Date()
    ),
    Habit.create(
      "3",
      "user1",
      Description.create("Ler 20 páginas de um livro por dia"),
      new Date(),
      new Date()
    ),
  ];

  private constructor() {}

  public static getInstance(): MockHabitRepository {
    if (!MockHabitRepository.instance) {
      MockHabitRepository.instance = new MockHabitRepository();
    }
    return MockHabitRepository.instance;
  }

  async save(habit: Habit): Promise<void> {
    this.habits.push(habit);
  }

  async findById(habitId: string, userId: string): Promise<Habit | null> {
    return (
      this.habits.find(
        (habit) => habit.id == habitId && habit.userId == userId
      ) || null
    );
  }

  async findAll(userId: string): Promise<Habit[] | null> {
    return this.habits.length > 0
      ? this.habits.filter((habit) => habit.userId == userId)
      : null;
  }

  async update(habit: Habit): Promise<void> {
    const habitIndex = this.habits.findIndex((h) => h.id === habit.id);
    if (habitIndex !== -1) {
      this.habits[habitIndex] = habit;
    }
  }

  async delete(habitId: string, userId: string): Promise<void> {
    this.habits = this.habits.filter((habit) => habit.id !== habitId);
  }
}
