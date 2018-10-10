$(document).ready(function(){
    $("#update").click(function(){
        checkRecipe();
        jsonRecipe();
    });


    
});

//check fields aren't empty
function checkRecipe(){
    submitForm();
}

function submitForm(){
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
        time: hourV+"."+mintueV,
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