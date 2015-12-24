'use strict';
(function () {
    var api = window.app.api;
    var app = window.app;
    var controller = {};
    var helpers = window.app.helpers;
    var router = window.app.router;

    controller.onInit = function () {
        _bindEvents();
    }

    controller.name = 'home';

    window.app.controllers.push(controller);

    function _bindEvents() {
        app.domElements.buttonAbout.addEventListener('click', _onAboutClick);
        app.domElements.buttonAdd.addEventListener('click', _onAddClick);
        app.domElements.buttonCheck.addEventListener('click', _onCheckClick);
    }

    function _onAboutClick() {
        alert('Hello!');
    }

    function _onAddClick() {
        var lineName = app.domElements.lineName.value;

        if (lineName) {
            router.changeState('add', lineName);
        }
    }

    function _onCheckClick(event) {
        var lineName = app.domElements.lineName.value;

        if (lineName) {
            helpers.makePending(event.target);
            api.requestTrafficProblemsForLine(lineName, function (problems) {
                helpers.unmakePending(event.target);
                router.changeState('check', {
                    lineName: lineName,
                    problems: problems
                });
            });
        }
    }
})();