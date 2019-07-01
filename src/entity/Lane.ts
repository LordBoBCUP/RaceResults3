import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Double} from "typeorm";
import { Track } from "./Track";

@Entity()
export class Lane {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @Column({
        length: 200
    })
    colour: string;

    @Column({type: 'real'
    })
    length: number;

    @ManyToOne(type => Track, (track: Track) => track.lanes)
    track: Track;


}
