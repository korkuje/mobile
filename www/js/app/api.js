'use strict';
(function () {
    var api = {};

    api.requestTrafficProblemsForLine = function (lineName, callback) {
        if (callback) {
            callback([{
                type: 2,
                createdAt: new Date().toISOString(),
                lineName: lineName
            }]);
        }
        else {
            console.warn('requestTrafficProblemsForLine has no callback. You\'ve forgotten about it, haven\'t you?');
        }
    };

    window.app.api = api;
})();