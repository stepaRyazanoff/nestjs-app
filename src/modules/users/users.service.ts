import { Injectable } from '@nestjs/common';
import { users } from '../../mocks';

@Injectable()
export class UsersService {
  async getUsers() {
    return users;
  }
}
