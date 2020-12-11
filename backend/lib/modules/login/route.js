"use strict";

const express = require('express');
const userRouter = express.Router();
const utilityController = require('./index.js');

userRouter.post('/create', utilityController.create);
userRouter.post('/login', utilityController.login);


module.exports = userRouter;