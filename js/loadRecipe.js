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

function likeRecipe(){
    console.log(id);
    var $thisRating = $("#overallRating");

    if(confirm("Are you sure you want to like this recipe?")){
        $.ajax({
            url: 'php/retrieveRecipeInfo.php',
            type: 'post',
            data: {"callAddRating": id},
            success: function (data) {
                
                var $value = Number($thisRating.innerHTML()) + 1;
                console.log($value);
                document.getElementById("overallRating").innerHTML=$value;
                
                alert("Successfully Upvoted!");
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
}



