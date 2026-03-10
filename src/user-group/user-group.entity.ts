import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";

@Entity('user_groups')
export class UserGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    group: "creator" | "viewer";

    @OneToMany(() => User, (user) => user.group)
    users: User[];
}