var search;
var id;
var step = document.getElementById("stepsContainter");
var originalStep;
var stepCount;
var ingredient = document.getElementById("ingreContent");
var originalInfo;
var ingredientCount;


function loadRecipe() {
    getURLParameter(window.location.href);
    var title = getURLParameter('title');
    var nationality = getURLParameter('nationality');
    id = getURLParameter('id');
    var get = getURLParameter('get');
    console.log(id);
    if (title != null) {
        search = "title:" + title.toLowerCase();
        checkIngredient();
    } else if (nationality != null) {
        search = "nationality:" + nationality;
        checkIngredient();
    } else if (id != null) {
        console.log(id);
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
                document.getElementById("recipeTitle").innerHTML= data.title;
                document.getElementById("recipeImage").src=data.image;     
                document.getElementById("moneyCost").innerHTML= data.cost;
                document.getElementById("difficultyL").innerHTML= data.diffculty;
                document.getElementById("overallRating").innerHTML= data.rating;
                document.getElementById("region").innerHTML= data.nationality;
                document.getElementById("duration").innerHTML=data.hour + " hours " + data.minute + " mins ";
                document.getElementById("createDate").innerHTML= data.date.date.toString().split(" ")[0];

                for(ingredientCount in data.ingredient) {
                    originalInfo = document.getElementById("info0");
                    var clone = originalInfo.cloneNode(true);
                    clone.id = "info" + ingredientCount;
                    ingredient.appendChild(clone);
                    clone.style.display = "";
                  
                
                    $("#info"+ingredientCount).children("th").text(ingredientCount);
                    $("#info"+ingredientCount).children(".ingredientName").html(data.ingredient[ingredientCount].name);
                    $("#info"+ingredientCount).children(".ingredientAmount").html(data.ingredient[ingredientCount].amount);

          
                }

                for(stepCount in data.step) {
                    originalStep = document.getElementById("step0");
                    var clone = originalStep.cloneNode(true);
                    clone.id = "step" + stepCount;
                    step.appendChild(clone);
                    clone.style.display = "";
                
                    $("#step"+stepCount).children(".stepNum").text("Step " + stepCount);
                    $("#step"+stepCount).children("p").text(data.step[stepCount].content);
                
                    var stepImageId ="stepImg" + stepCount;
                    document.getElementById("stepImg").id = stepImageId;
                    document.getElementById(stepImageId).src = data.step[stepCount].image;
                            
                }


                

                if (String(data.owner) == 'true'){
                    $("#delete").css("visibility", "visible");
                }
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
    var count = 1; // a variable to count the result number 

    // loop through each recipe from the json
    for (result in data) {
        console.log(data[result].image);
        console.log(data[result].nationality);
        console.log(data[result].title);
        console.log(data[result].date.date.toString().split(" ")[0]);
        console.log(data[result].hour);
        console.log(data[result].minute);
        console.log(data[result].cost);
        console.log(data[result].diffculty);
        console.log(data[result].rating);

        // append a new result
        var newResult = 

        // whole result container
        '<div class="col-sm-4">' + 

            // recipe image & nationality 
            '<div class=" resultImg mb-2">' +
                '<a href="recipe.html" id="link"><img id="result-image" class="summaryImg rounded img-fluid" ' +
            'src="img/bg.jpg" width=""></a>' +
                '<div class="bottom-right rounded">' + 
                    '<small id="result-nationality">Food Type</small>' + 
                '</div>' + 
            '</div>' + 

            // recipe title & publish date
            '<div class="row">' + 
                '<h6 id="result-title" class="col"><a class="text-dark">' +
            'Recipe Name</a></h6>' +
                '<h6 class="col text-muted text-right">' + 
                    '<small id="result-date">2018-09-21</small>' + 
                '</h6>' + 
            '</div>' + 

            // recipe tags, including time cost(hour:minute) & money cost($) & difficulty level
            // as well as the rating number(how many user vote it)
            '<div class="tag">' + 
                '<span id="result-time-cost" class="badge badge-secondary" style="margin-right: 5px">Time cost</span>' +
                '<span id="result-money-cost" class="badge badge-secondary" style="margin-right: 5px">cost</span>' +
                '<span id="result-difficulty-level" class="badge badge-secondary">Level</span>' + 
                '<div class="pull-right">' + 
                    '<span id="result-rating" class="badge badge-success "> <span id="rating">99</span>' +
            ' <i class="fa fa-thumbs-up ml-1"></i> </span>' +
                '</div>' + 
                '<hr class="mb-3">' + 
            '</div>' + 
        '</div>';

        // every row contains 3 results, create a new row if count % 3 == 1
        if (count%3 == 1) {
            $("#searchResult").append('<div class="row mb-2">' + '</div>');
        }
        $(".row.mb-2").append(newResult);

        // get real data for every result
        // get the real image
        var imageId = "result-image" + count;
        document.getElementById("result-image").id = imageId;
        document.getElementById(imageId).src  = data[result].image;

        var linkId = "link" + count;
        document.getElementById("link").id = linkId;
        document.getElementById(linkId).href = "recipe.html?id=" + data[result].id;

        // get the real nationality
        var nationalityId = "result-nationality" + count;
        document.getElementById("result-nationality").id = nationalityId;
        document.getElementById(nationalityId).innerHTML = data[result].nationality;

        // get the real title
        var titleId = "result-title" + count;
        document.getElementById("result-title").id = titleId;
        document.getElementById(titleId).innerHTML = data[result].title;

        // get the real date
        var dateId = "result-date" + count;
        document.getElementById("result-date").id = dateId;
        document.getElementById(dateId).innerHTML = data[result].date.date.toString().split(" ")[0];

        // get the real time cost
        var timeCostId = "result-time-cost" + count;
        document.getElementById("result-time-cost").id = timeCostId;
        document.getElementById(timeCostId).innerHTML = data[result].hour + "h" +  data[result].minute + "m";

        // get the real money cost
        var moneyCostId = "result-money-cost" + count;
        document.getElementById("result-money-cost").id = moneyCostId;
        document.getElementById(moneyCostId).innerHTML = "$" + data[result].cost;

        // get the real difficulty level
        var difficultyLevelId = "result-difficulty-level" + count;
        document.getElementById("result-difficulty-level").id = difficultyLevelId;
        document.getElementById(difficultyLevelId).innerHTML = data[result].diffculty;

        // get the real rating
        var ratingId = "result-rating" + count;
        var ratingtextId = "result-rating-text" + count;
        document.getElementById("result-rating").id = ratingId;
        document.getElementById("rating").id = ratingtextId;
        document.getElementById(ratingtextId).innerHTML = data[result].rating;

        count++;
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

function deleteRecipe(){
    console.log(id);
    if(confirm("Are you sure you want to delete this recipe?")){
        $.ajax({
            url: 'php/retrieveRecipeInfo.php',
            type: 'post',
            data: {"callDelete": id},
            success: function (data) {
                console.log(data);
                window.location.href = 'index.html';
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
}




