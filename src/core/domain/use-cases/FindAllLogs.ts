import { HabitLog } from "../entities/HabitLog";
import { IHabitLogRepository } from "../repositories/IHabitLogRepository";

export class FindAllLogs {
    constructor(readonly HabitLogRepository: IHabitLogRepository) {}

    async execute(habitId:string): Promise<HabitLog[]> {

        const allLogsById = await this.HabitLogRepository.findAll(habitId)

        return allLogsById ? allLogsById : []
    }
}