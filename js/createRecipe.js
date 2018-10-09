//to give each individual ingredient and step an individual id
var ingredientCount = 2;
var stepCount = 1;

//check fields aren't empty
function checkRecipe(){
    var recipeTitle = $('#recipeTitle').val();
    var recipeType = $('#recipeType').val();
    var hour = $('#hour').val();
    var mintues = $('#mintues').val();
    var recipeLevel = $('#recipeLevel').val();
    var cost = $('#cost').val();
}

function jsonRecipe(){
    
}

function addIngredient(){
    $("#ingredientList").append(
        '<tr>' +
                                '<td>' +
                                    '<input class="form-control" name="name[]" type="text" id="ingredient' + ingredientCount + '" placeholder="Ingredient Name"/>'+
                                '</td>'+
                                '<td>'+
                                    '<input class="form-control" name="amount[]" type="text" id="amount' + ingredientCount + '" placeholder="Amount"/>'+
                                '</td>'+
                                '<td>'+
                                    '<button class="btn btn-danger btn-remove" type="button" onclick="deleteIngredient(this)">'+
                                    '<i class="fa fa-minus gs mr-1">' + '</i>' + 'Delete'+
                                    '</button>'+
                                '</td>'+
                            '</tr>'
    );
    ingredientCount++;
}

function deleteIngredient(item){
    var td = item.parentElement;
    var tr = td.parentElement;
    tr.parentElement.removeChild(tr);
    ingredientCount--;
    
}
function addStep(){
    $("#stepContainer").insertBefore(
        '<div id="step'+ stepCount + '" class="form-group">'+
            '<h3><b>Step' + stepCount+ '</b></h3>' +
                '<div class="form-inline">' +
                    '<button type="button" name="deleteStep" class=" delete btn btn-danger" onclick="deleteStep(this)">' +
                       'Delete Step'+
                    '</button>'+

                    '<label for="image-upload" class="create-btn btn btn-primary mb-0" style="margin-left: 2%;">'+
                            'Add Step image'+
                    '</label>'+
                    '<input id="image-upload" name="image-upload1" type="file" style="display:none;" accept="image/x-png,image/gif,image/jpeg" multiple/>'+

                '</div>'+
                '<br>'+
                '<div class="form-group">'+
                    '<textarea name="content1" cols="88" rows="8" placeholder="Write Your step Detail here..." class="form-control"></textarea>'+
                '</div>'+
                '<div id="preview' + stepCount + '" class="imagePreview form-group">'+

                '</div>'+
        '</div>'
        
        , '#stepContainer.childNodes[#stepContainer.length]'

    );
    stepCount++;
}
function deleteStep(item){
    var td = item.parentElement;
    var tr = td.parentElement;
    tr.parentElement.removeChild(tr);
    ingredientCount--;
    
}