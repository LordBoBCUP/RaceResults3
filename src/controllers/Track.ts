import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Track } from "../entity/Track";
import { Rule } from "../entity/Rule";
import { Lane } from "../entity/Lane";
import { BroadcasterResult } from "typeorm/subscriber/BroadcasterResult";

export const findAll = async (req: Request, res: Response) => {
    //Get user from database
    const trackRepository = getRepository(Track);

    const tracks = await trackRepository.find({ relations: ['rules', 'lanes'] });
    //Send the jwt in the response
    res.send(tracks);
};

export const findTrackById = async (req: Request, res: Response) => {
    const id: number = req.params.trackId;

    const trackRepository = getRepository(Track);
    try {
        const track = await trackRepository.findOneOrFail({ id: id });
        res.send(track);
    } catch (err) {
        res.status(404).send("Track not found with trackId" + id);
    }
};

export const newTrack = async (req: Request, res: Response) => {
    let { name, address, email, owner_name, active } = req.body;

    let track = new Track();
    track.name = name;
    track.address = address;
    track.email = email;
    track.owner_name = owner_name;
    track.active = active;

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
};

export const updateTrack = async (req: Request, res: Response) => {
    // let track = await TrackController.findTrackById(req, res);
    const id: number = req.params.trackId;
    let track: Track;

    const trackRepository = getRepository(Track);
    try {
        track = await trackRepository.findOneOrFail({ id: id });
    } catch (err) {
        res.status(404).send("Track not found with trackId" + id);
    }

    let { name, address, email, owner_name, active, rules, lanes } = req.body;

    track.name = name;
    track.address = address;
    track.email = email;
    track.owner_name = owner_name;
    track.active = active;

    // Process related tables
    // Rules
    const ruleRepository = getRepository(Rule);
    rules.forEach(async rule => {
        let dbRule = await ruleRepository.findOneOrFail({ id: rule.id });
        if (!dbRule) {
            track.rules.push(rule);
        } else {
            dbRule.name = rule.name;
            dbRule.html = rule.html;
            dbRule.url = rule.url;
            dbRule.active = rule.active;
            const errors = await validate(dbRule);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            ruleRepository.save(dbRule);
        }
    });

    // Rules
    const laneRepository = getRepository(Lane);
    lanes.forEach(async lane => {
        let dbLane = await laneRepository.findOneOrFail({ id: lane.id });
        if (!dbLane) {
            track.rules.push(lane);
        } else {
            dbLane.name = lane.name;
            dbLane.length = lane.html;
            dbLane.colour = lane.url;
            const errors = await validate(dbLane);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            laneRepository.save(dbLane);
        }
    });

    res.status(204).send();
};