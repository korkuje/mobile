'use strict';
(function() {
    var api = window.app.api;
	var app = window.app;
	var controller = {};
	var router = window.app.router;

    controller.init = function() {
        _bindEvents();
    }

    window.app.controllers.push(controller);

	function _bindEvents() {
        app.domElements.buttonAbout.addEventListener('click', function() {_onAboutClick();});
        app.domElements.buttonCheck.addEventListener('click', function() {_onCheckClick();});
	}
    	
	function _onAboutClick() {
        alert('Hello!');
    }
	
    function _onCheckClick() {
        var lineName = app.domElements.lineName.value;
        if (lineName) {
            api.requestTrafficProblemsForLine(lineName, function (problems) {
				console.error('Not reimplemented yet');
                router.changeState('check');
            });
        }
    }
})();