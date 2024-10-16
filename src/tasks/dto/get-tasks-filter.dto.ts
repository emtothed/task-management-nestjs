import { TaskStatus } from '../task.module';

export class getTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
