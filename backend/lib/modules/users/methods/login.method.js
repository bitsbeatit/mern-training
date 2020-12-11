'use strict';

(() => {
    const bcrypt = require('bcrypt');
    const uuidv4 = require('uuid').v4;
    const jwt = require('jsonwebtoken');


    module.exports = async(req, res, next) => {
        try {
            const { userName } = req.body;
            const userInfo = await req.db.collection('User').findOne({
                userName
            });
            const comparePassword = await bcrypt.compare(req.body.password, userInfo.password);
            if (comparePassword) {
                const token = await jwt.sign({
                    userId: userInfo.id
                }, 'secret', {
                    expiresIn: '1m'
                });
                return res.status(200).json({
                    token,
                    message: "Success"
                  });
            }
            

        } catch(err) {
            next(err)
        }
    }
})();