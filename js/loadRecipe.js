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

function likeRecipe(object){
    console.log(id);
    var $thisButton = object;

    if(confirm("Are you sure you want to like this recipe?")){
        $.ajax({
            url: 'php/retrieveRecipeInfo.php',
            type: 'post',
            data: {"callAddRating": id},
            success: function (data) {
                console.log(data);
                var $voteCount = $thisButton.parent();
                console.log($voteCount.text());
                var $value = Number($voteCount.text()) + 1;
                $voteCount.text($value);
                console.log($voteCount.text());
                alert("Successfully Upvoted!");
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
}


