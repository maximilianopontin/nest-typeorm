import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
export class CreateAuthorDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 64)
  userName: string;

  @IsEmail()
  email: string;
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain a minimum of 8 characters and at least 1 lower case, 1 upper case, 1 number and 1 special character',
    },
  )
  password: string;
}
