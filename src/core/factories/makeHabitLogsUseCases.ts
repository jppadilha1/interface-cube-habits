import { IHabitLogRepository } from "../domain/repositories/IHabitLogRepository";
import { MockHabitLogRepository } from "../infra/mocks/MockHabitLogRepository";
import { FindAllLogs } from "../domain/use-cases/FindAllLogs";
import { RegisterLog } from "../domain/use-cases/RegisterLog";

export function makeHabitLogUseCase() {
  const habitLogRepository: IHabitLogRepository =
    MockHabitLogRepository.getIstance();

  const findAll = new FindAllLogs(habitLogRepository);
  const register = new RegisterLog(habitLogRepository);

  return {
    findAll,
    register,
  };
}
