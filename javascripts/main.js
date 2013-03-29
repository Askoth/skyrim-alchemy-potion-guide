'use strict';
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
})();



$.when(
	$.ajax('javascripts/data.json')
).then(App);

function App (rawData){
	var alchemyData = rawData;

    backgroundImage();

    var mainView = new MainView({
            ingredientsCollection: startIngredientsCollection(alchemyData),
            effectsCollection: startEffectsCollection(alchemyData),
        });

    mainView.render();

};

