var app = {
    domElements: {},
    api: {
        requestTrafficProblemsForLine: function (lineName, callback) {
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
        }
    },
    bindEvents: function () {
        document.addEventListener('deviceready', app.onDeviceReady, false);
        document.addEventListener('backbutton', app.onBackButton, false);
        app.domElements.buttonAbout.addEventListener('click', app.onAboutClick);
        app.domElements.buttonCheck.addEventListener('click', app.onCheckClick);
    },
    cacheDomLookups: function () {
        var uniqueItems = document.querySelectorAll('[id]');
        for (var i = 0; i < uniqueItems.length; i++) {
            var singleItem = uniqueItems[i];
            if (singleItem.id) {
                var camelCasedId = singleItem.id.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                app.domElements[camelCasedId] = uniqueItems[i];
            }
        }
    },
    changeState: function (newState) {
        var splittedClasses = app.domElements.containerMain.className.split(' ');
        splittedClasses.forEach(function (element, index, array) {
            if (element.indexOf('state-') === 0) {
                array.splice(index, 1);
            }
        });
        splittedClasses.push('state-' + newState);
        app.domElements.containerMain.className = splittedClasses.join(' ');
    },
    initialize: function () {
        app.cacheDomLookups();
        app.bindEvents();
    },
    onAboutClick: function () {
        alert('Hello!');
    },
    onBackButton: function() {
      app.changeState('home');  
    },
    onCheckClick: function () {
        var lineName = app.domElements.lineName.value;
        if (lineName) {
            app.api.requestTrafficProblemsForLine(lineName, function (problems) {
                app.renderProblemsForLine(lineName, problems);
                app.changeState('check');
            });
        }
    },
    onDeviceReady: function () {
        app.changeState('home');
    },
    renderProblemsForLine: function (lineName, problems) {
        app.domElements.checkTitle.innerText = lineName;
        
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
};
