"use strict"

//모듈
const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//라우터
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded( { extends : true} ));

app.use("/", home);

module.exports = app;