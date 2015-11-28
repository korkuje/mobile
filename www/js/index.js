var app = {
    domElements: {},
    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
        app.domElements.buttonAbout.addEventListener('click', app.onAboutClick);
    },
    cacheDomLookups: function() {
        var uniqueItems = document.querySelectorAll('[id]');
        for(var i = 0; i<uniqueItems.length; i++) {
            var singleItem = uniqueItems[i];
            if(singleItem.id) {
                var camelCasedId = singleItem.id.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                app.domElements[camelCasedId] = uniqueItems[i];            
            }
        }
    },
    changeState: function(newState) {
        var splittedClasses = app.domElements.container.className.split(' ');
        splittedClasses.forEach(function(element, index, array) {
           if(element.indexOf('state-') === 0) {
               array.splice(index, 1);
           } 
        });
        splittedClasses.push('state-' + newState);
        app.domElements.container.className = splittedClasses.join(' ');
    },
    initialize: function() {
        app.cacheDomLookups();
        app.bindEvents();
    },
    onAboutClick: function() {
      alert('Hello!');  
    },
    onDeviceReady: function() {
        app.changeState('home');
    }
};
