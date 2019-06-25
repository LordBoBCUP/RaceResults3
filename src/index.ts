import "reflect-metadata";
import {createConnection} from "typeorm";

import routes from "./routes";

const express = require('express');
const bodyParser = require('body-parser');

createConnection().then(async connection => {

// create the express app
const app = express();

// Call Middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Add the Routes
app.use("/", routes);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});


}).catch(error => console.log(error));
