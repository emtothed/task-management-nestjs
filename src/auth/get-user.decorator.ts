import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// Here we create a decorator that returns the user object from the validated request sent by user
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
