"use strict";

const Joi = require('joi');

// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

const validatePost = (req) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        roll: Joi.number().required()
    });

    const { error } = schema.validate(req.body, options);
    if (error) {
        const errMessages = [];
        for (let errDetail of error.details) {
            errMessages.push({
                field: errDetail.context.label,
                message: errDetail.message
            });
        }
        return {
            valid: false,
            message: errMessages
        };
    } else {
        return {
            valid: true
        };
    }
}

module.exports = {
    validatePost
};