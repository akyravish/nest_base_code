import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: any[] = [
    {
      userId: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      userId: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findOneById(userId: string): Promise<any | undefined> {
    return this.users.find((user) => user.userId === userId);
  }
}
