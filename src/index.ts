import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Track} from './entity/Track';
import { Rule } from "./entity/Rule";

createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

    const track = new Track();
    track.active = true;
    track.address = "123 hannigan drive, Auckland, New Zealand";
    track.email = "1@1.com";
    track.name = "Orakei Raceway";
    track.owner_name = "mike doo";
    
    const rule = new Rule();
    rule.active =true;
    rule.html = "<HTML></HTML>";
    rule.name = "5 Seconds";
    rule.url = "http://google.com";

    rule.track = track;

    let trackRepository = connection.getRepository(Track);

    await trackRepository.save(track);
    //await connection.manager.save(rule);

    let t = await trackRepository.findOneOrFail({name: "Orakei Raceway"});
    console.log(t.rules);



}).catch(error => console.log(error));
