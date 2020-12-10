"use strict";

((appRoutes) => {
    
    appRoutes.init = (app) => {
        const postRouter = require('../modules/posts/route');
        app.use('/api/posts', postRouter);

        const utilityRouter = require('../modules/utilities/route');
        app.use('/api/utility', utilityRouter);
    };
})(module.exports);