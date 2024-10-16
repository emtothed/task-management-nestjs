import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus) // checks if the status is a value from TaskStatus
  status: TaskStatus;
}
