import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Rule} from './Rule';

@Entity()
export class Track {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @Column({
        length: 100
    })
    address: string;

    @Column({
        length: 50
    })
    email: string;

    @Column({
        length: 50
    })
    owner_name: string;

    @Column()
    active: boolean;

    @OneToMany(type => Rule, (rule: Rule) => rule.track, { 
        cascade: true,
    })
    rules: Rule[];

}
