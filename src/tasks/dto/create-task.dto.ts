import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty() // validation decorator for checking that the variable is not empty
  title: string;

  @IsNotEmpty()
  description: string;
}
