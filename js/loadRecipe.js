function loadRecipe(){
	getURLParameter(window.location.href );
	var title = getURLParameter('title');
	var nationality = getURLParameter('nationality');
	if (title != null){
		getRecipe("title:"+title.toLowerCase());	
	} else if (nationality != null){
		getRecipe("nationality:"+nationality);
	} else{
		$( "#searchResult" ).css( "display", "none" );
		$( "#noResultDisplay" ).css( "display", "block" );
	}
	
}

function getRecipe(data){
	$.ajax({
			url: 'php/retrieveRecipeInfo.php',
			type: 'post',
			data: {"callGetRecipeInfo":data},
			dataType: 'json',
		success: function(data){
			console.log(data);
			if (data!== null && data !== ""){
				// data is the json returned back from the search result
				generateResult(data);
				
				
			} else {
				console.log("no data matched");
				$( "#searchResult" ).css( "display", "none" );
				$( "#noResultDisplay" ).css( "display", "block" );
			}
		},
		error: function(data){
			console.log("error");
			console.log(data);
		}
	});
}

function generateResult(data){
	$( "#searchResult" ).css( "display", "block" );
	$( "#noResultDisplay" ).css( "display", "none" );
	// loop through each recipe from the json
	for(result in data) {
		// get title, date etc. for each recipe
		console.log(data[result].title);
		console.log(data[result].date);
		console.log(data[result].diffculty);
		console.log(data[result].image);
		console.log(data[result].time);
		console.log(data[result].rating);
		// TO DO display all these onto the actual page
	}
}