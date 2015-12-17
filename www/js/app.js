'use strict';
(function () {
	var app = {};

	app.controllers = [];
	app.domElements = {};

	app.init = function () {
		_loadViews();
		_cacheDOMLookups();
		_initControllers();
		window.app.router.init();
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
		app.controllers.forEach(function(singleController) {
			if(singleController.onInit) {
				singleController.onInit();
			}
		});
	}
	
	function _loadViews() {		
		var mainContainer = app.domElements.containerMain || document.getElementById('container-main');

		app.controllers.forEach(function(singleController) {
			var div = document.createElement('div');
			div.innerHTML = _requestSingleView(singleController.name);
			mainContainer.appendChild(div.firstChild);
		});
	}
	
	function _requestSingleView(name) {
		var request = new XMLHttpRequest();
		request.open('GET', './views/' + name + '.html', false);
		request.send();
		if (request.status === 200) {
			return request.responseText;
		}
		else {
			throw 'Failed to load view "' + name + '".';
		}
	}
})();