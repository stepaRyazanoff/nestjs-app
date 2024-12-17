import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppError } from '../../common/constants/errors';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      const existUser = await this.usersService.checkUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);
      return await this.usersService.createUser(dto);
    } catch (error) {
      console.error('Error while creating user', error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('An unexpected occurred');
    }
  }

  async loginUser(dto: LoginUserDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.usersService.checkUserByEmail(dto.email);
      if (!existUser) throw new BadRequestException(AppError.WRONG_DATA);
      const validatePassword = await this.usersService.checkUserPassword(
        dto.password,
        existUser.password,
      );
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
      const user = await this.usersService.publicUser(dto.email);
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (error) {
      console.error('Error while auth user', error);
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('An unexpected occurred');
    }
  }
}
