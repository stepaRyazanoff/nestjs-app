import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class AuthUser {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthUserResponse {
  @ApiProperty()
  user: AuthUser;

  @ApiProperty()
  @IsString()
  token: string;
}
