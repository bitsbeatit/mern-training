"use strict";

const uuidv4 = require('uuid').v4;
const { createPost } = require('./validation');
const postHelper = require('./helpers/post.helper');
const validate = require('../../validation');

const getRecords = (req, res, next) => {
    try {
        // callback example
        const callback = (statusCode, data) => {
            res.status(200).json({
                success: true,
                data
            });
        }

        return postHelper.getPostsList(req.db, callback);
    } catch(err) {
        return next(err);
    }
};

const getRecordByPostId = (req, res, next) => {
    // promise example
    postHelper.getPostById(req.db, req.params.post_id)
        .then((postInfo) => {
            if (!postInfo) {
                return res.status(404).json({
                    error: true,
                    message: 'Post Record Not Found'
                });
            }

            return res.status(200).json({
                success: true,
                data: postInfo
            });
        })
        .catch((err) => {
            return next(err);
        });
}

const saveRecord = async (req, res, next) => {
    try {
        const { valid, message } = validate(req, createPost);

        if (!valid) {
            return res.status(400).json({
                error: true,
                message
            });
        }

        const saveRes = await postHelper.savePost(req.db, req.body);

        if (saveRes && saveRes.result && (saveRes.result.n > 0)) {
            return res.status(200).json({
                success: true,
                message: 'Successfully added posts record'
            });
        }

        return res.status(500).json({
            error: true,
            message: 'Failed while adding post record'
        });
    } catch(err) {
        return next(err);
    }
};

const deleteRecord = (req, res) => {
    console.log('deleting data', req.body)
    req.db.collection('posts').deleteOne({
        post_id: req.params.post_id
    }, (err, result) => {
        if (err) {
            console.log('Error while deleting posts table record => ', err);
            return res.status(500).json({
                error: true,
                message: 'Something went wrong'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted posts record'
        });
    });
};

const updateRecord = (req, res) => {
    console.log('updating data', req.body)
    req.db.collection('posts').updateOne({
        post_id: req.params.post_id
    }, {
        $set: {
            name: req.body.name,
            roll: req.body.roll
        }
    }, (err, result) => {
        if (err) {
            console.log('Error while updating posts table record => ', err);
            return res.status(500).json({
                error: true,
                message: 'Something went wrong'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted posts record'
        });
    });
};

const patchRecord = (req, res) => {
    console.log('patching data');
    req.db.collection('posts').findOne({
        post_id: req.params.post_id,
        deleted: false
    }, (err, data) => {
        if (err) {
            console.log('Error while getting posts table record => ', err);
            return res.status(500).json({
                error: true,
                message: 'Something went wrong'
            });
        }

        if (data) {
            req.db.collection('posts').updateOne({
                post_id: req.params.post_id,
            }, {
                $set: {
                    deleted: true
                }
            }, (err, result) => {
                if (err) {
                    console.log('Error while patching posts table record => ', err);
                    return res.status(500).json({
                        error: true,
                        message: 'Something went wrong'
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Successfully deleted post record'
                });
            });
        } else {
            return res.status(404).json({
                error: true,
                message: 'Post Record Not Found'
            });
        }
    });
}

module.exports = {
    getRecords,
    getRecordByPostId,
    saveRecord,
    deleteRecord,
    updateRecord,
    patchRecord
}
