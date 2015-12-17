'use strict';
(function () {
	var app = {};

	app.controllers = [];
	app.domElements = {};

	app.init = function () {
		window.app.router.init('home');
		_cacheDOMLookups();
		_initControllers();
	};

	window.app = app;

	function _cacheDOMLookups() {
		var uniqueElements = document.querySelectorAll('[id]');
		for (var i = 0; i < uniqueElements.length; i++) {
			var singleItem = uniqueElements[i];
            if (singleItem.id) {
                var camelCasedId = singleItem.id.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                app.domElements[camelCasedId] = uniqueElements[i];
            }
		}
	}

	function _initControllers() {
		app.controllers.forEach(function (singleController) {
			singleController.init();
		});
	}
})();