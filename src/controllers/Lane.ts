import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Lane } from "../entity/Lane";
import { Track } from "../entity/Track";



export const findAllByTrack = async (req: Request, res: Response) => {
    //Get user from database
    const laneRepository = getRepository(Lane);
    const trackId: number = req.params.trackId;

    const lanes = await laneRepository.find({ relations: ['track'] });
    //Send the jwt in the response
    res.send(lanes);
};

export const findLaneById = async (req: Request, res: Response) => {
    const id: number = req.params.laneId;
    const trackId: number = req.params.trackId;

    const laneRepository = getRepository(Lane);
    try {
        const rule = await laneRepository.findOneOrFail({ id: id }, { relations: ['track'] });
        res.send(rule);
    } catch (err) {
        res.status(404).send("Lane not found with trackId " + trackId + " and this laneId " + id);
    }
};

export const newLane = async (req: Request, res: Response) => {
    let trackId: number = req.params.trackId;
    let { name, colour, length } = req.body;
    let track: Track;

    const trackRepository = getRepository(Track);
    try {
        track = await trackRepository.findOneOrFail({id: trackId});
    } catch (err) {
        res.status(404).send("Track not found with trackId" + trackId);
    }

    let lane = new Lane();
    lane.name = name;
    lane.colour = colour;
    lane.length = length;
    lane.track = track;
    
    const errors = await validate(lane);

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    const laneRepository = getRepository(Lane);

    try {
        await laneRepository.save(lane);
    } catch (err) {
        res.status(400).send(err);
        return;
    }

    res.status(201).send("Lane Created");
};
