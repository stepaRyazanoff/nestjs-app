import { IsNumber, IsString } from 'class-validator';

export class AuthenticatedRequest extends Request {
  user: IUser;
}

export class IUser {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  userName: string;

  @IsString()
  email: string;
}
