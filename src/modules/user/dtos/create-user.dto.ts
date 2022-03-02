import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  fbId: string;

  @IsUrl()
  @IsOptional()
  fbLink: string;

  @IsEmail()
  email: string;

  @Length(8, 128)
  password: string;
}
