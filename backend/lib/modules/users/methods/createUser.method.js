'use strict';

(() => {
    const bcrypt = require('bcrypt');
    const uuidv4 = require('uuid').v4;

    module.exports = async(req, res, next) => {
        try {    
            const { userName, email, password } = req.body;
            const passSalt = await bcrypt.genSalt(10);
            const computeHash = await bcrypt.hash(password, passSalt);
            const insertUser = await req.db.collection('User').insertOne({
                id: uuidv4(),
                userName,
                password: computeHash,
                passwordSalt: passSalt,
                email
            });
            return res.status(200).json({
                success: true,
                message: 'User has been saved successfully'
            });
        } catch(err) {
            next(err)
        }
    }
})();