const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
require("./config/db"); // we dont need to store it in a variable because when it goes in db folder it will automatically connect to database

const routes = require('./routes/v1');
const config = require("./config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(config.PREFIX, routes);

module.exports = app;