import { UserGroup } from 'src/user-group/user-group.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: 'admin' | 'user' | 'guest';

  @Column()
  active: boolean; 

  @Column()
  password: string;

  @ManyToOne(() => UserGroup, (group) => group.users, { eager: true })
  group: UserGroup;
}