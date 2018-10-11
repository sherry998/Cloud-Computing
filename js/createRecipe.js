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
    submitForm();
}

function submitForm(){
    var recipeTitleV = $('#recipeTitle').val();
    var hourV = $('#hour').val();
    var minuteV = $('#minutes').val();
    var costV = $('#cost').val();

    //Check title is not empty
    if (recipeTitleV == "" || recipeTitleV == null ) {
        alert("Recipe Title cannot be empty.");
        return false;
    }

    //Check time is not empty
    else if (hour == "" || hour == null || minutes == "" || minutes == null ) {
        alert("Hours and minutes must only have numerical values");
        return false;
    }

    //Check time is not empty
    else if (costV == "" || costV == null) {
        alert("Cost must only have numerical values");
        return false;
    }

    //Test for special characters in Title
    else if (/^[a-zA-Z0-9- ]*$/.test(recipeTitleV) == false) {
        alert("Special characters not allowed in title");
        return false;
    }

    //Test each ingredient
    $(".ingredient").each(function () {
        if (this.value == "" || this.value == null ) {
            alert("Ingredient cannot be empty");
            return false;
        }
        else if (/^[a-zA-Z0-9- ]*$/.test(this.value) == false) {
            alert("Ingredient cannot have special characters");
            return false;
        }
    });

    //Test each amount
    $(".amount").each(function () {
        if (this.value == "" || this.value == null ) {
            alert("Amount cannot be empty");
        }
        else if (/^[a-zA-Z0-9- ]*$/.test(this.value) == false) {
            alert("Amount cannot have special characters");
            return false;
        }
    });

    //Test each Step
    $(".step").each(function () {
        if (this.value == "" || this.value == null ) {
            alert("Instruction step cannot be empty");
            return false;
        }
    });

    var rowCount = $('table >tbody:last >tr').length;
    console.log(rowCount);
    console.log(num);
    createInvisibleInput("numIngredient", rowCount,"#editForm");
    createInvisibleInput("numSteps", num,"#editForm");
    var pathname = window.location.pathname;
    if (pathname.includes("createRecipe")){
        $("#editForm").attr('action', 'php/createRecipe.php');
        $("#editForm").submit();
    }else if (pathname.includes("editRecipe")){
        /*
        createInvisibleInput("id", guideId,"#editForm");
        $("#editForm").attr('action', 'php/updateGuide.php');
        console.log($("#editForm"));
        $("#editForm").submit();*/
    }


}

function cancel(){
    var recipeTitleV = $('#recipeTitle').val();
    var hourV = $('#hour').val();
    var minuteV = $('#minutes').val();
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
    var minuteV = $('#minutes').val();
    var recipeLevelV = $('#recipeLevel').val();
    var costV = $('#cost').val();

    var recipeObj = {
        title: recipeTitleV,
        type: recipeTypeV,
        diffculty: recipeLevelV,
        //image:,
        time: hourV+"."+minuteV,
        cost : costV

    };

    var jsonString;


    jsonString = JSON.stringify(recipeObj);
    console.log(jsonString);
}

$('.container').on('change',".upload",function() {
    if ($("#" + this.id)[0].files[0]!= null) {
        var file = $("#" + this.id)[0].files[0].name;
        console.log("#" + this.id);
        $(this).prev('label').text(file);
    } else {
        $(this).prev('label').text('Add Step image');
    }
});

function updateLabel(){
    if ($("#" + this.id)[0].files[0]!= null) {
        var file = $("#" + this.id)[0].files[0].name;
        console.log("#" + this.id);
        $(this).prev('label').text(file);
    } else {
        $(this).prev('label').text('Add Step image');
    }
}

function createInvisibleInput(name, value,formName){
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", name);
    hiddenField.setAttribute("value", value);
    $(formName).append(hiddenField);
}
