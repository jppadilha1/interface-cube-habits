import { IHabitRepository } from "../domain/repositories/IHabitRepository";
import { MockHabitRepository } from "../infra/mocks/MockHabitRepository";
import { CreateHabit } from "../domain/use-cases/CreateHabit";
import { FindHabits } from "../domain/use-cases/FindHabit";
import { UpdateHabit } from "../domain/use-cases/UpdateHabit";
import { DeleteHabit } from "../domain/use-cases/DeleteHabit";

export function makeHabitUseCases() {
  const HabitRepository: IHabitRepository = MockHabitRepository.getInstance();

  const create = new CreateHabit(HabitRepository);
  const readAll = new FindHabits(HabitRepository);
  const update = new UpdateHabit(HabitRepository);
  const delet = new DeleteHabit(HabitRepository);

  return {
    create,
    readAll,
    update,
    delet,
  };
}
