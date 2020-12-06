"use strict";

((appRoutes) => {

    appRoutes.init = (app) => {
        const postRouter = require('../modules/posts/route');
        app.use('/api/posts', postRouter);
    };
})(module.exports);