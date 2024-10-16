import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'user1',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksServise: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    // initialize a NestJS module with tasksServise and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksServise = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls tasksRepository and returns the result', async () => {
      (tasksRepository.getTasks as jest.Mock).mockResolvedValue('someValue');
      const result = await tasksServise.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTasksById', () => {
    it('calls tasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'test title',
        description: 'some text',
        id: 'someId',
        status: TaskStatus.OPEN,
      };

      (tasksRepository.findOne as jest.Mock).mockResolvedValue(mockTask);
      const result = await tasksServise.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls tasksRepository.findOne and handles an error', () => {
      (tasksRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(tasksServise.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
