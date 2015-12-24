'use strict';
(function() {
    var app = window.app;
    var controller = {};
    
    controller.name = 'check';
    
    controller.onActivate = function(data) {
        _renderProblemsForLine(data.lineName, data.problems);    
    }
    
    controller.onInit = function() {
        app.domElements.checkButtonAdd.addEventListener('click', _onAddClick);
    }
    
    function _onAddClick() {
        app.router.changeState('add', app.domElements.checkLineName.innerText);
    }
    
    function _renderProblemsForLine(lineName, problems) {
        app.domElements.checkLineName.innerText = lineName;
        
        // clear
        while (app.domElements.checkProblemList.firstChild) {
            app.domElements.checkProblemList.removeChild(app.domElements.checkProblemList.firstChild);
        }

        for (var i = 0; i < problems.length; i++) {
            var singleElement = document.createElement('li');
            singleElement.innerText = 'problem';
            app.domElements.checkProblemList.appendChild(singleElement);
        }
    }
	
    window.app.controllers.push(controller);
})();