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

    var $thisRating = $("#overallRating").text();

    if(confirm("Are you sure you want to like this recipe?")){
        $.ajax({
            url: 'php/retrieveRecipeInfo.php',
            type: 'post',
            data: {"callAddRating": id},
            success: function (data) {
                
                var $value = Number($thisRating) + 1;
                
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



