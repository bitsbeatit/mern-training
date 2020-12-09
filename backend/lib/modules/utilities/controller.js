"use strict";

const bcrypt = require('bcrypt');

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

module.exports = {
    createHash,
    compareHash
};
