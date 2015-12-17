'use strict';
(function () {
	var app = window.app;
	var router = {};
	
	router.changeState = function (newState, data) {
		var capitalizedState = newState.charAt(0).toUpperCase() + newState.slice(1);
		var mainContainer = app.domElements.containerMain || document.getElementById('container-main');

		while (mainContainer.firstChild) {
			mainContainer.removeChild(mainContainer.firstChild);
		}

		mainContainer.innerHTML = _loadView(newState);

		var splittedClasses = mainContainer.className.split(' ');
		splittedClasses.forEach(function (element, index, array) {
			if (element.indexOf('state-') === 0) {
				array.splice(index, 1);
			}
		});
		splittedClasses.push('state-' + newState);
		mainContainer.className = splittedClasses.join(' ');
	};
	
	router.init = function(initialState) {
		router.changeState(initialState);
	}

	window.app.router = router;
	
	function _loadView(name) {
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
