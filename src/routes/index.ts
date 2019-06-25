import { Router, Request, Response } from "express";
import tracks from "./track";
import rule from "./rule";

const routes = Router();

routes.use("/tracks", tracks);
routes.use("/rules", rule);

export default routes;