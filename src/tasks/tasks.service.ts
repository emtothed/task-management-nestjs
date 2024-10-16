import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  // Course method : depricated
  // constructor(
  //   @InjectRepository(TasksRepository)
  //   private taskRepository: TasksRepository,
  // ) {}
  constructor(private taskRepository: TasksRepository) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  getTasks(filterDto: getTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.description.includes(search) || task.title.includes(search)) {
  //         return true;
  //       }
  //     });
  //   }
  //   return tasks;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    // Find an object from the database
    const found = await this.taskRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task not found - Id:${id} `); // throws an 404 not found exception with a custom message
    }

    return found;
  }

  async deleteTask(id: string): Promise<void> {
    // removes the given entity
    /*const task = await this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task not found - Id:${id} `);
    }
    await this.taskRepository.remove(task); */

    // removes the entity with the given id or property like {name : "ali"}
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task not found - Id:${id} `);
    }
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
