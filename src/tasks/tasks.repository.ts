import { DataSource, /*EntityRepository ,*/ Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';

// Course method : depricated
// @EntityRepository(Task)
// export class TasksRepository extends Repository<Task> {}

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: getTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      // applying some sort of filter using 'where'
      // - :status is a variable passed to our query
      // - and it is defined right in the object in the next argument.
      query.andWhere('task.status = :status', { status: status }); // applying some sort of filter using 'where'
    }

    if (search) {
      // applying the search feature
      // - LIKE keyword checks if there is similarity between two params
      // - LOWER() converts the params to lower case form
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    // Create a new object and save it in the database
    const task = this.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);

    return task;
  }
}
