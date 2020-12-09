"use strict";

const uuidv4 = require('uuid').v4;

const getPostsList = (db, callback) => {
    try {
        db.collection('posts').find({
            deleted: false
        }).toArray((err, docs) => {
            if (err) {
                console.log('Error while getting posts table records => ', err);
                throw new Error(err);
            } else {
                callback(200, docs);
            }
        });
    } catch(err) {
        throw new Error(err);
    }
};

const getPostById = (db, postId) => {
    return new Promise((resolve, reject) => {
        db.collection('posts').findOne({
            post_id: postId
        }, ((err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        }));
    });
};

const savePost = async (db, payload) => {
    try {
        return db.collection('posts').insertOne({
            post_id: uuidv4(),
            name: payload.name,
            roll: payload.roll,
            deleted: false
        });
    } catch(err) {
        throw new Error(err);
    }
};

module.exports = {
    getPostsList,
    getPostById,
    savePost
};
