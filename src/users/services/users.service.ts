import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUser, UpdateUserDto } from '../dtos';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async getAll() {
    const users = await this.repository.find({});
    return users;
  }

  async create(body: CreateUser) {
    // Validamos que no exista un usuario con el mismo email y usuario
    const validateUser = await this.repository.findOne({
      where: [{ email: body.email }, { username: body.username }],
    });

    if (validateUser) {
      throw new HttpException(
        'Usuario o correo ya en uso',
        HttpStatus.BAD_REQUEST,
      );
    }

    // password hash
    const hashedPassword = await this.hashPassword(body.password);

    const userToCreate = await this.repository.save({
      ...body,
      password: hashedPassword,
    });

    // Eliminamos el password de la respuesta
    delete userToCreate.password;

    return userToCreate;
  }

  async updateUserById(body: UpdateUserDto, id: string) {
    const currentUser = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!currentUser) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Si se está actualizando la contraseña, hasheamos la nueva
    if (body.password) {
      body.password = await this.hashPassword(body.password);
    }

    await this.repository.update(id, body);

    const updatedUser = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    return updatedUser;
  }

  async deleteUserById(id: string) {
    const currentUser = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!currentUser) {
      throw new HttpException(
        'Usuario no encontrado para eliminar',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.delete(currentUser.id);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
