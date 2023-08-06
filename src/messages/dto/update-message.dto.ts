import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  text: string;
}
