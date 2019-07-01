import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Rule } from "../entity/Rule";
import { Track }  from "../entity/Track";


export const findAllByTrack = async (req: Request, res: Response) => {
    //Get user from database
    const ruleRepository = getRepository(Rule);
    const trackId: number = req.params.trackId;

    const rules = await ruleRepository.find({ relations: ['track'] });
    //Send the jwt in the response
    res.send(rules);
};

export const findRuleById = async (req: Request, res: Response) => {
    const id: number = req.params.ruleId;
    const trackId: number = req.params.trackId;

    const ruleRepository = getRepository(Rule);
    try {
        const rule = await ruleRepository.findOneOrFail({ id: id }, { relations: ['track'] });
        res.send(rule);
    } catch (err) {
        res.status(404).send("Track not found with trackId" + id);
    }
};

export const newRule = async (req: Request, res: Response) => {
    let trackId = req.params.trackId;
    let { name, url, html, active } = req.body;
    let track: Track;

    const trackRepository = getRepository(Track);
    try {
        track = await trackRepository.findOneOrFail({id: trackId});
    } catch (err) {
        res.status(404).send("Track not found with trackId" + trackId);
    }

    let rule = new Rule();
    rule.name = name;
    rule.url = url;
    rule.html = html;
    rule.active = active;
    rule.track = track;

    const errors = await validate(rule);

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    const ruleRepository = getRepository(Rule);

    try {
        await ruleRepository.save(rule);
    } catch (err) {
        res.status(400).send(err);
        return;
    }

    res.status(201).send("Rule Created");
};


