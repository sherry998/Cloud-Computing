function loadRecipe() {
    getURLParameter(window.location.href);
    var title = getURLParameter('title');
    var nationality = getURLParameter('nationality');
    var id = getURLParameter('id');
    var get = getURLParameter('get');
    if (title != null) {
        getRecipe("title:" + title.toLowerCase());
    } else if (nationality != null) {
        getRecipe("nationality:" + nationality);
    } else if (id != null) {
        getRecipeEveryInfo("id:" + id);
    } else if (get == "everything"){
        getRecipe("get:" + get);
	}else{
		$( "#searchResult" ).css( "display", "none" );
		$( "#noResultDisplay" ).css( "display", "block" );
        $( "#recipleInfo" ).css( "display", "none" );
        $( "#noInfo" ).css( "display", "block" );
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
            $( "#searchResult" ).css( "display", "none" );
            $( "#noResultDisplay" ).css( "display", "block" );
		}
	});
}

function getRecipeEveryInfo(data){
    $.ajax({
        url: 'php/retrieveRecipeInfo.php',
        type: 'post',
        data: {"callGetRecipeInfo":data},
        dataType: 'json',
        success: function(data){
            console.log(data);
            if (data!== null && data !== ""){
                // data is the json returned back from the search result
                $( "#recipleInfo" ).css( "display", "block" );
                $( "#noInfo" ).css( "display", "none" );

            } else {
                console.log("no data matched");
                $( "#recipleInfo" ).css( "display", "none" );
                $( "#noInfo" ).css( "display", "block" );
            }
        },
        error: function(data){
            console.log("error");
            console.log(data);
            $( "#recipleInfo" ).css( "display", "none" );
            $( "#noInfo" ).css( "display", "block" );
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