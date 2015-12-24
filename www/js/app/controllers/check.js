'use strict';
(function () {
    var app = window.app;
    var controller = {};
    var problemTypes = window.app.constants.problemTypes;

    controller.name = 'check';

    controller.onActivate = function (data) {
        _renderProblemsForLine(data.lineName, data.problems);
    }

    controller.onInit = function () {
        app.domElements.checkButtonAdd.addEventListener('click', _onAddClick);
    }

    function _onAddClick() {
        app.router.changeState('add', app.domElements.checkLineName.innerText);
    }
    
    function _renderProblemListElement(innerText) {
        var element = document.createElement('li');
        element.innerText = innerText;
        app.domElements.checkProblemList.appendChild(element);
    }

    function _renderProblemsForLine(lineName, problems) {
        var thereAreAnyProblems = problems.length > 0;

        app.domElements.checkLineName.innerText = lineName;
        
        // clear
        while (app.domElements.checkProblemList.firstChild) {
            app.domElements.checkProblemList.removeChild(app.domElements.checkProblemList.firstChild);
        }

        if (thereAreAnyProblems) {
            for (var i = 0; i < problems.length; i++) {
                var singleProblem = problems[i];
                var textBuilder = [];

                textBuilder.push(problemTypes[singleProblem.reason].name);
                textBuilder.push(' zgłoszony o ');
                textBuilder.push(singleProblem.createdAt);
                _renderProblemListElement(textBuilder.join(''));
            }
        }
        else {
                _renderProblemListElement('(brak)');
        }
    }

    window.app.controllers.push(controller);
})();