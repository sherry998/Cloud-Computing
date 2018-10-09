$(document).ready(function(){
    $("#update").click(function(){
        checkRecipe();
        jsonRecipe();
    });
    
});

//check fields aren't empty
function checkRecipe(){
   
}

function jsonRecipe(){
    var recipeTitleV = $('#recipeTitle').val();
    var recipeTypeV = $('#recipeType').val();
    var hourV = $('#hour').val();
    var mintueV = $('#mintues').val();
    var recipeLevelV = $('#recipeLevel').val();
    var costV = $('#cost').val();

    var recipeObj = {
        title: recipeTitleV,
        type: recipeTypeV,
        diffculty: recipeLevelV,
        //image:,
        time: {
            hour: hourV,
            minute: mintueV
        }, 
        cost : costV
        
    };

    var jsonString;

    
    jsonString = JSON.stringify(recipeObj);
    console.log(jsonString);
}
