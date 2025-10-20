import { HabitLog } from "../entities/HabitLog";
import { IHabitLogRepository } from "../repositories/IHabitLogRepository";

export class RegisterLog {
    constructor(readonly HabitLogRepository: IHabitLogRepository) {}

    async execute(params: {id:string,habitId:string,doneAt:Date}): Promise<void> {
        const {id, habitId, doneAt} = params

        await this.HabitLogRepository.save(HabitLog.create(id,habitId,doneAt))
    }
}