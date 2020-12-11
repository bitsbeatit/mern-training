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
            })
            if(!userInfo) {
                return res.status(500).json({
                    success: false,
                    message: 'User not found'
                });
            }
            const comparePassword = await bcrypt.compare(req.body.password, userInfo.password);
            if(!comparePassword) {
                return res.status(500).json({
                    success: false,
                    message: 'Password and username does not match'
                });
            }
            const token = await jwt.sign({
                userId: userInfo.id
            }, 'secret', {
                expiresIn: '10m'
            });
            return res.status(200).json({
                token,
                message: "Success"
              });

        } catch(err) {
            next(err)
        }
    }
})();