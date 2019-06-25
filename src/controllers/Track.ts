import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Track } from "../entity/Track";
import { Rule } from "../entity/Rule";
import { BroadcasterResult } from "typeorm/subscriber/BroadcasterResult";

class TrackController {

    static findAll = async (req: Request, res: Response) => {
        //Get user from database
        const trackRepository = getRepository(Track);

        const tracks = await trackRepository.find();
        //Send the jwt in the response
        res.send(tracks);
    };

    static findTrackById = async (req: Request, res: Response) => {
        const id: number = req.params.trackId;

        const trackRepository = getRepository(Track);
        try {
            const track = await trackRepository.findOneOrFail({id: id});
            res.send(track);
        } catch (err) {
            res.status(404).send("Track not found with trackId" + id);
        }
    }

    static newTrack = async (req: Request, res: Response) => {
        let {name, address, email, owner_name, active, rules} = req.body;

        let track = new Track();
        track.name = name;
        track.address = address;
        track.email = email;
        track.owner_name = owner_name;
        track.active = active;
        track.rules = [rules];
        
        const errors = await validate(track);

        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        const trackRepository = getRepository(Track);

        try {
            await trackRepository.save(track);
        } catch (err) {
            res.status(400).send(err);
            return;
        }

        res.status(201).send("Track Created");
    }

    static updateTrack = async (req: Request, res: Response) => {
        // let track = await TrackController.findTrackById(req, res);
        const id: number = req.params.trackId;
        let track: Track;

        const trackRepository = getRepository(Track);
        try {
            track = await trackRepository.findOneOrFail({id: id});
        } catch (err) {
            res.status(404).send("Track not found with trackId" + id);
        }

        let {name, address, email, owner_name, active, rules} = req.body;

        track.name = name;
        track.address = address;
        track.email = email;
        track.owner_name = owner_name;
        track.active = active;

        // Process related tables
        // Rules
        const ruleRepository = getRepository(Rule);
        rules.forEach( async rule => {
            let dbRule = await ruleRepository.findOneOrFail({id: rule.id});
            if (!dbRule){
                track.rules.push(rule);
            } else {
                dbRule.name = rule.name;
                dbRule.html = rule.html;
                dbRule.url = rule.url;
                dbRule.active = rule.active;
                ruleRepository.save(dbRule);
            }            
        });

        res.status(201).send("Track Updated");
    }

}
export default TrackController;
