"use strict";

((appRoutes) => {
    
    appRoutes.init = (app) => {
        const postRouter = require('../modules/posts/route');
        app.use('/api/posts', postRouter);

        const utilityRouter = require('../modules/utilities/route');
        app.use('/api/utility', utilityRouter);

        const userRouter = require('../modules/users/route');
        app.use('/api/user', userRouter);

        const loginRouter = require('../modules/login/route');
        app.use('/api/login', loginRouter);
    };
})(module.exports);