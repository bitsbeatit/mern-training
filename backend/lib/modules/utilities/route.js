"use strict";

const express = require('express');
const utilityRouter = express.Router();
const utilityController = require('./controller');

utilityRouter.post('/create-hash', utilityController.createHash);
utilityRouter.post('/compare-hash', utilityController.compareHash);

module.exports = utilityRouter;