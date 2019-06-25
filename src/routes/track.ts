import { Router } from "express";
import Track from "../controllers/Track";

const router = Router();
    // Returns all active track objects
    router.get('/', Track.findAll);

    // Returns a track object that matches the ID passed
    router.get('/:trackId', Track.findTrackById);

    // Creates a new Track object
    router.post('/', Track.newTrack);

    router.put('/:trackId', Track.updateTrack);

export default router;