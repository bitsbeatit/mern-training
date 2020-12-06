"use strict";

const uuidv4 = require('uuid').v4;

const getRecords = (req, res) => {
    console.log('getting data');
    req.db.collection('posts').find({
        deleted: false
    }).toArray((err, docs) => {
        if (err) {
            console.log('Error while getting posts table records => ', err);
            return res.status(500).json({
                error: true,
                message: 'Something went wrong'
            });
        }

        return res.status(200).json({
            success: true,
            data: docs
        });
    });
};

const getRecordByPostId = (req, res) => {
    console.log('getting data by post id');
    req.db.collection('posts').findOne({
        post_id: req.params.post_id
    }, (err, data) => {
        if (err) {
            console.log('Error while getting posts table record by post id => ', err);
            return res.status(500).json({
                error: true,
                message: 'Something went wrong'
            });
        }

        if (data) {
            return res.status(200).json({
                success: true,
                data
            });
        }

        return res.status(404).json({
            error: true,
            message: 'Post Record Not Found'
        })
    });
}

const saveRecord = (req, res) => {
    req.db.collection('posts').insertOne({
        post_id: uuidv4(),
        name: req.body.name,
        roll: req.body.roll,
        deleted: false
    }, (err, result) => {
        if (err) {
            console.log('Error while adding posts table record => ', err);
            return res.status(500).json({
                error: true,
                message: 'Something went wrong'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully added posts record'
        });
    });
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
