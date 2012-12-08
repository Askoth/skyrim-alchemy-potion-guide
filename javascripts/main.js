


$.when(
	$.ajax('javascripts/_templates/rawdata.html'),
	$.ajax('javascripts/_templates/list.html')
).then(function(rawData, listTemplate){ 

	var dataList = $(rawData[0]).find('tbody tr'),
		output = rawData,
		dataArray = [];

	dataArray = parseDataList(dataList);

	output = template(listTemplate[0], {listItems: dataArray});

	$('#results').html(output);

	console.log('working', dataList.length, typeof rawData)


});








