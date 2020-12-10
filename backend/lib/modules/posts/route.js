"use strict";

const express = require('express');
const postRouter = express.Router();
const postController = require('./controller');
const postValidation = require('./validation');
const validate = require('../../validation');
const helperFunct = {
    myLogger: (req, res, next) => {
        console.log('LOGGED')
        next();
        // res.status(500);
        // res.json({
        //   error:{
        //     message: "You have an error"
        //   }
        // });
        
    }
      
}
postRouter.get('/', helperFunct.myLogger, postController.getRecords);
postRouter.get('/:post_id', postController.getRecordByPostId);
postRouter.post('/', validate(postValidation.createPost), postController.saveRecord);
postRouter.delete('/:post_id', postController.deleteRecord);
postRouter.put('/:post_id', postController.updateRecord);
postRouter.patch('/delete/:post_id', postController.patchRecord);

module.exports = postRouter;