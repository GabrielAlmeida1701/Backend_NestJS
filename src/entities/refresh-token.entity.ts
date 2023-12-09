import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    token: string;

    @Column()
    expires: Date;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    userId: number;
}
