'use strict'; 


$('.nav-lnk').click(function (e) {
	e.preventDefault();
	$('#container').toggleClass('show-preferences');
});