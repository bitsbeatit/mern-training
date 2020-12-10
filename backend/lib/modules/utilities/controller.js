"use strict";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createHash = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.value, salt);

    res.status(200).json({
        success: true,
        data: { hash }
    });
};

const compareHash = (req, res) => {
    const isProvidedValueCorrect = bcrypt.compareSync(req.body.value, req.body.hash);

    if (isProvidedValueCorrect) {
        return res.status(200).json({
            success: true
        });
    }

    return res.status(400).json({
        error: true
    });
};

const createJWT = (req, res) => {
    const token = jwt.sign(req.body, 'secret', {
        expiresIn: '1m'
    });

    return res.status(200).json({
        success: true,
        token
    });
};

const decodeJWT = (req, res) => {
    const decodedInfo = jwt.verify(req.headers.authorization, 'secret', );

    return res.status(200).json({
        success: true,
        data: { decodedInfo }
    });
};

module.exports = {
    createHash,
    compareHash,
    createJWT,
    decodeJWT
};
