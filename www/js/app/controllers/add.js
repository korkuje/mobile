'use strict';
(function () {
    var app = window.app;
    var controller = {};

    var formValues = {
        lineName: '',
        reason: -1,
        latitude: -1,
        longitude: -1
    };
    var geolocationWatchId;

    controller.name = 'add';

    controller.onActivate = function (data) {
        formValues.lineName = data;
        app.domElements.addLineName.innerText = data;

        geolocationWatchId = navigator.geolocation.watchPosition(_onGeolocationSuccess, _onGeolocationError, {
            timeout: 1000 * 60 * 3,
            enableHighAccuracy: true,
            maximumAge: 60 * 1000
        });
    }

    controller.onDeactivate = function () {
        navigator.geolocation.clearWatch(geolocationWatchId);
    }

    controller.onInit = function () {
        app.domElements.addConfirm.addEventListener('click', _onConfirmClick);
    }

    function _onConfirmClick() {
        app.domElements.addConfirm.className += ' pending';
        app.api.addTrafficProblem(formValues, function () {
            app.domElements.addConfirm.className = app.domElements.addConfirm.className.replace(' pending', '');
            app.router.changeState('home');
            alert('Dziękujemy za zgłoszenie. :)');
        });
    }

    function _onGeolocationError(error) {
        console.warn('Failed to fetch geoposition.');
        console.warn(error);
    }

    function _onGeolocationSuccess(position) {
        formValues.latitude = position.latitude;
        formValues.longitude = position.longitude;
        console.log(position);
    }

    window.app.controllers.push(controller);
})();