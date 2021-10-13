import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateFollowDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
