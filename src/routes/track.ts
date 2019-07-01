import { Router } from "express";
import * as Track from "../controllers/Track";
import * as Lane from "../controllers/Lane";
import * as Rule from "../controllers/Rule";

const router = Router();
    // Returns all active track objects
    router.get('/', Track.findAll);

    // Returns a track object that matches the ID passed
    router.get('/:trackId', Track.findTrackById);

    // Creates a new Track object
    router.post('/', Track.newTrack);

    router.put('/:trackId', Track.updateTrack);

    // Rules 
    router.get('/:trackId/rules', Rule.findAllByTrack);

    // Returns a track object that matches the ID passed
    router.get('/:trackId/rules/:ruleId', Rule.findRuleById);

    // POST a new Rule for a track
    router.post('/:trackId/rules', Rule.newRule);

    // Lanes
    // Returns all active track objects
    router.get('/:trackId/lanes', Lane.findAllByTrack);

    // Returns a track object that matches the ID passed
    router.get('/:trackId/lanes/:laneId', Lane.findLaneById);

    // POST a new Lane for a track
    router.post('/:trackId/lanes', Lane.newLane);

export default router;