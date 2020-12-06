"use strict";

const Joi = require('joi');

const createPost = {
    name: Joi.string().required(),
    roll: Joi.number().required()
};

module.exports = {
    createPost
};