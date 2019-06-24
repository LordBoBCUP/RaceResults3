import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Track } from "./Track";

@Entity()
export class Rule {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @Column({
        length: 200
    })
    url: string;

    @Column({
        length: 1000
    })
    html: string;

    @Column()
    active: boolean;

    @ManyToOne(type => Track, track => track.rules)
    track: Track;


}
