import { IsString, Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 15)
  username: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsOptional()
  img: string;
  @IsString()
  @Length(8, 30)
  password: string;
  @IsString()
  @Length(2, 30)
  displayName: string;
  @IsString()
  @IsNotEmpty()
  birth: string;
  @IsString()
  @Length(1, 200)
  bio: string;
}
