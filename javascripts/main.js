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
	$.ajax('javascripts/data.json'),
	$.ajax('javascripts/templates/list.html')
).then(function(rawData, listTemplate){ 
	var output = rawData,
		alchemyData = rawData[0];

	// addToRenderQueue(alchemyData);

    render();


    function render () {

        var output = template(listTemplate[0], {
                ingredients: alchemyData.ingredients,
                effects: alchemyData.effects
            });

        console.log(alchemyData);

        $('#lists-wrap').append($(output).clone());
        $('#lists-wrap').append($(output).clone());
    }

    

});








