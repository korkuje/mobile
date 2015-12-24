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
        app.domElements.homeButtonAbout.addEventListener('click', _onAboutClick);
        app.domElements.homeButtonAdd.addEventListener('click', _onAddClick);
        app.domElements.homeButtonCheck.addEventListener('click', _onCheckClick);
    }
    
    function _handleNoLineSpecified() {
            alert('Proszę podać nazwę linii.');
            app.domElements.homeLineName.focus();
    }

    function _onAboutClick() {
        alert('Hello!');
    }

    function _onAddClick() {
        var lineName = app.domElements.homeLineName.value;

        if (lineName) {
            router.changeState('add', lineName);
        }
        else {
            _handleNoLineSpecified();
        }
    }

    function _onCheckClick(event) {
        var lineName = app.domElements.homeLineName.value;

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
        else {
            _handleNoLineSpecified();
        }
    }
})();