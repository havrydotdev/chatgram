import { Chat } from 'src/chats/entities/chat.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @OneToOne(() => Chat, {
    onDelete: 'CASCADE',
  })
  chat: Chat;

  @OneToOne(() => User)
  user: User;
}
