import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { UpdateUserDTO } from './dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../../common/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  updateUser(
    @Body() dto: UpdateUserDTO,
    @Req() request: AuthenticatedRequest,
  ): Promise<UpdateUserDTO> {
    const { email } = request.user;
    return this.usersService.updateUser(email, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 204 })
  deleteUser(@Req() request: AuthenticatedRequest): Promise<boolean> {
    const { email } = request.user;
    return this.usersService.deleteUser(email);
  }
}
