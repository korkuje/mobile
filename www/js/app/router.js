'use strict';
(function () {
	var app = window.app;
	var initialState = 'home';
	var router = {};
	var stateContainers;	

	router.changeState = function (newState, data) {
		var destinationController = _resolveDestinationController(newState);
		
		for(var i = 0; i<stateContainers.length; i++) {
			if(stateContainers[i].classList.contains('container-' + newState)) {
				stateContainers[i].style.display='block';
			}
			else {
				stateContainers[i].style.display='none';
			}
		}
		
		if(destinationController.onActivate) {
			destinationController.onActivate(data);
		}
	};
	
	router.init = function() {
		stateContainers = document.querySelectorAll('[class^="container-"]');
		
		document.addEventListener('backbutton', _onBackButton, false);
		router.changeState(initialState);
	}

	window.app.router = router;
	
	function _onBackButton() {
		router.changeState(initialState);
	}
	
	function _resolveDestinationController(name) {
		var filteredControllers = app.controllers.filter(function(c) {
			return c.name === name;
		});
		
		if(filteredControllers.length === 1) {
			return filteredControllers[0];
		}
		else if(filteredControllers.length > 1) {
			throw 'Cannot resolve destination controller. Two controllers with name "' + name + '" were found.';
		}
		else {
			throw 'Cannot resolve destination controller. There is no controller with name "' + name + '".';
		}
	}
})();
