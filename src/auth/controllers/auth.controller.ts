import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../../users/entities/user.entity';
import { Public } from '../decorators/public.decorator';
import { RegisterDto } from '../dtos';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() register: RegisterDto, @Req() req: Request) {
    await this.authService.registerUser(register, req);

    return {
      message: 'Registro exitoso',
      status: HttpStatus.OK,
      data: null,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { user, accessToken } = await this.authService.login(loginDto);

    return {
      message: 'Login exitoso',
      status: HttpStatus.OK,
      data: {
        user,
        accessToken,
      },
    };
  }

  @Get('profile')
  getProfile(@GetUser() user: User) {
    return {
      message: 'Perfil de usuario',
      status: HttpStatus.OK,
      data: user,
    };
  }
}
