'use strict';
(function () {
    var helpers = {};
    
    helpers.addClass = function(element, className) {
        element.className += ' ' + className;
    };
    
    helpers.makePending = function(element) {
        helpers.addClass(element, 'pending');
    };
    
    helpers.removeClass = function(element, className) {
        element.className = element.className.replace(' ' + className, '');
    };
    
    helpers.unmakePending = function(element) {
        helpers.removeClass(element, 'pending');
    };
    
    window.app.helpers = helpers;
})();
