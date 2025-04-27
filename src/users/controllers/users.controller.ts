import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUser, UpdateUserDto } from '../dtos';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async getAllUsers() {
    const response = await this.users.getAll();
    return {
      message: 'Fetched all users',
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Post('create')
  async createUser(@Body() body: CreateUser) {
    const response = await this.users.create(body);

    return {
      message: 'User created',
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Patch('update/:id')
  // @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async updateUser(
    @Body() body: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const response = await this.users.updateUserById(body, id);

    return {
      message: 'Usuario actualizado correctamente',
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Delete('delete/:id')
  // @Roles(UserRole.SUPER_ADMIN)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.users.deleteUserById(id);

    return {
      message: 'Usuario eliminado correctamente',
      status: HttpStatus.OK,
      data: null,
    };
  }
}
