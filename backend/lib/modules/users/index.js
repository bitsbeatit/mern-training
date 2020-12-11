"use strict";

(()=> {
    module.exports = {
        create: require('./methods/createUser.method'),
        login: require('./methods/login.method')
    }
})();