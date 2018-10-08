var search;

function loadRecipe() {
    getURLParameter(window.location.href);
    var title = getURLParameter('title');
    var nationality = getURLParameter('nationality');
    var id = getURLParameter('id');
    var get = getURLParameter('get');
    if (title != null) {
        search = "title:" + title.toLowerCase();
        checkIngredient();
    } else if (nationality != null) {
        search = "nationality:" + nationality;
        checkIngredient();
    } else if (id != null) {
        search = "id:" + id;
        getRecipeEveryInfo(search);
    } else if (get == "everything") {
        search = "get:" + get;
        checkIngredient();
    } else {
        $("#searchResult").css("display", "none");
        $("#noResultDisplay").css("display", "block");
        $("#recipleInfo").css("display", "none");
        $("#noInfo").css("display", "block");
    }

}

function getRecipe(data) {
    $.ajax({
        url: 'php/retrieveRecipeInfo.php',
        type: 'post',
        data: {"callGetRecipeInfo": data},
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data !== null && data !== "") {
                // data is the json returned back from the search result
                generateResult(data);
            } else {
                console.log("no data matched");
                $("#searchResult").css("display", "none");
                $("#noResultDisplay").css("display", "block");
            }
        },
        error: function (data) {
            console.log("error");
            console.log(data);
            $("#searchResult").css("display", "none");
            $("#noResultDisplay").css("display", "block");
        }
    });
}

function getRecipeEveryInfo(data) {
    $.ajax({
        url: 'php/retrieveRecipeInfo.php',
        type: 'post',
        data: {"callGetRecipeInfo": data},
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data !== null && data !== "") {
                // data is the json returned back from the search result
                $("#recipleInfo").css("display", "block");
                $("#noInfo").css("display", "none");

            } else {
                console.log("no data matched");
                $("#recipleInfo").css("display", "none");
                $("#noInfo").css("display", "block");
            }
        },
        error: function (data) {
            console.log("error");
            console.log(data);
            $("#recipleInfo").css("display", "none");
            $("#noInfo").css("display", "block");
        }
    });
}

function checkIngredient(){
    var checkedValues = $('input:checkbox:checked').map(function() {
        return this.id;
    }).get();
    if (!isEmptyObject(checkedValues)) {
        var data = search + ":filter" + ":" + checkedValues;
    } else {
        data =search;
    }
    console.log (data);
    getRecipe(data);
}

function generateResult(data) {
    $("#searchResult").css("display", "block");
    $("#noResultDisplay").css("display", "none");
    // loop through each recipe from the json
    for (result in data) {
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

function isEmptyObject( obj ) {
    for ( var element in obj ) {
        return false;
    }
    return true;
}

function clearAll(){
    $('input[type=checkbox]').prop('checked',false);
}


