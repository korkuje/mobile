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
    }

    function _onAboutClick() {
        alert('Hello!');
    }

    function _onAddClick() {
        router.changeState('add');
    }
})();