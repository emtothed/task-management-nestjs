import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // first argument '(type) => Task' defines the type of the property

  // second argument '(task) => task.user' defines that -
  // --how will this property be used from the other side of the relation, in this case, from the task

  // third argument '{ eager: true }' means when we get the object (user) from DB,-
  // --we get the tasks with it automatically

  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
