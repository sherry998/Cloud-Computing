$(document).ready(function(){
    $("#update").click(function(){
        checkRecipe();
    });
    // $("#cancel").click(function(){
    //     cancel();
    // });
    
});

//check fields aren't empty
function checkRecipe(){
    var recipeTitleV = $('#recipeTitle').val();
    var hourV = $('#hour').val();
    var mintueV = $('#mintues').val();
    var costV = $('#cost').val();

    //Check title is not empty
    if (recipeTitleV == "" || recipeTitleV == null ) {
        alert("Recipe Title cannot be empty.");
    } 
    
    //Check time is not empty
    else if (hourV == "" || hourV == null || mintueV == "" || mintueV == null ) {
        alert("Hours and minutes must only have numerical values");
    } 

    //Check time is not empty
    else if (costV == "" || costV == null) {
        alert("Cost must only have numerical values");
    } 

    //Test for special characters in Title
    else if (/^[a-zA-Z0-9- ]*$/.test(recipeTitleV) == false) {
          alert("Special characters not allowed in title");
        }

    //Test each ingredient
    $(".ingredient").each(function () {
            if (this.value == "" || this.value == null ) {
                alert("Ingredient cannot be empty");
            } 
            else if (/^[a-zA-Z0-9- ]*$/.test(this.value) == false) {
            alert("Ingredient cannot have special characters");
            } 
    });

    //Test each amount
    $(".amount").each(function () {
        if (this.value == "" || this.value == null ) {
            alert("Amount cannot be empty");
        } 
        else if (/^[a-zA-Z0-9- ]*$/.test(this.value) == false) {
        alert("Amount cannot have special characters");
        } 
    }); 
   
    //Test each Step
    $(".step").each(function () {
        if (this.value == "" || this.value == null ) {
            alert("Instruction step cannot be empty");
        } 
    }); 
}

function cancel(){
    var recipeTitleV = $('#recipeTitle').val();
    var hourV = $('#hour').val();
    var mintueV = $('#mintues').val();
    var costV = $('#cost').val();

    recipeTitleV.removeAttr("value");
    hourV.removeAttr("value");
    minuteV.removeAttr("value");
    costV.removeAttr("value");

    //Remove each ingredient
    $(".ingredient").each(function () {
        this.value.removeAttr("value");
    });

    //Remove each amount
    $(".amount").each(function () {
        this.value.removeAttr("value");
    }); 
   
    //Test each Step
    $(".step").each(function () {
        this.value.removeAttr("value");
    }); 
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
