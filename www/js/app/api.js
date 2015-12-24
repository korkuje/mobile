'use strict';
(function () {
    var api = {};

    api.addTrafficProblem = function (formData, callback) {
        setTimeout(function () {
            if (callback) {
                callback();
            }
        }, 2000);
    };

    api.requestTrafficProblemsForLine = function (lineName, callback) {
        setTimeout(function () {
            if (callback) {
                callback([{
                    reason: 2,
                    createdAt: new Date().toISOString(),
                    lineName: lineName
                }]);
            }
            else {
                console.warn('requestTrafficProblemsForLine has no callback. You\'ve forgotten about it, haven\'t you?');
            }
        }, 2000);
    };

    window.app.api = api;
})();