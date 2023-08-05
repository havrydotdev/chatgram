import { IsArray, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class UpdateChatDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  users: User[];
}
