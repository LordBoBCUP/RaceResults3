import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Rule } from "../entity/Rule";


class RuleController {

    static findAllByTrack = async (req: Request, res: Response) => {
        //Get user from database
        const ruleRepository = getRepository(Rule);
        const trackId: number = req.params.trackId;

        const rules = await ruleRepository.find();
        //Send the jwt in the response
        res.send(rules);
    };

    static findRuleById = async (req: Request, res: Response) => {
        const id: number = req.params.ruleId;
        const trackId: number = req.params.trackId;

        const ruleRepository = getRepository(Rule);
        try {
            const rule = await ruleRepository.findOneOrFail({id: id});
            res.send(rule);
        } catch (err) {
            res.status(404).send("Track not found with trackId" + id);
        }
    }
}
export default RuleController;
