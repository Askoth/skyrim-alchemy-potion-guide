


$.when(
	// $.ajax('javascripts/templates/rawdata.html'),
	$.ajax('javascripts/data.json'),
	$.ajax('javascripts/templates/list.html')
).then(function(rawData, listTemplate){ 
	// var dataList = $(rawData[0]).find('tbody tr'),
	var dataList = rawData[0],
		output = rawData,
		dataArray;

	// dataArray = parseDataList(dataList);
	dataArray = rawData[0];

	output = template(listTemplate[0], {listItems: dataArray});

	$('#results').html(output);


});








