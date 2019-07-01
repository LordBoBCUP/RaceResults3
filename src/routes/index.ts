import { Router, Request, Response } from "express";
import tracks from "./track";
import rule from "./rule";
import lane from './lane';

const routes = Router();

routes.use("/tracks", tracks);
routes.use("/rules", rule);
routes.use("/lanes", lane);


export default routes;