import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class CreateUser {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  username: string;

  @IsString()
  @Length(6, 50)
  password: string;
}
