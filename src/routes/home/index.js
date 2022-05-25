"use strict"

const express = require("express");
const req = require("express/lib/request");
const router = express.Router();

//controller
const crtl = require('./home.ctrl');

router.get("/", crtl.output.home);
router.get("/login", crtl.output.login);
router.post("/login", crtl.process.login);

module.exports = router;