"use strict";

const Joi = require('joi');

module.exports = (validationObj) => {
    return function (req, res, next) {
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
            return res.status(400).json({
                error: true,
                data: errMessages
            });
        } else {
            next();
        }
    }
};