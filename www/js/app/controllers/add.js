'use strict';
(function() {
    var app = window.app;
    var controller = {};
    
    controller.name = 'add';
    
    controller.onActivate = function(data) {
        app.domElements.addLineName.innerText = data;
        // TODO: fetch location    
    }
    
    controller.onInit = function() {
        app.domElements.addConfirm.addEventListener('click', _onConfirmClick);
    }
    
    function _onConfirmClick() {
		// TODO: implement
        app.router.changeState('home');
    }
    
    window.app.controllers.push(controller);
})();