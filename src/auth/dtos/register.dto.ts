import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  password: string;
}
