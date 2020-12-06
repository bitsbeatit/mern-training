"use strict";

const Joi = require('joi');

module.exports = (req, validationObj) => {
    const schema = Joi.object(validationObj);

    const { error } = schema.validate(req.body, {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    });
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
};