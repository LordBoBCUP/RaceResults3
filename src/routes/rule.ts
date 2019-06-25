import { Router } from "express";
import Rule from "../controllers/Rule";

const router = Router();
    // Returns all active track objects
    router.get('/track/:trackId/', Rule.findAllByTrack);

    // Returns a track object that matches the ID passed
    router.get('/:ruleId/track/:trackId/', Rule.findRuleById);

export default router;