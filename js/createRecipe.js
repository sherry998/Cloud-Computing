//to give each individual ingredient and step an individual id
var ingredientCount = 1;
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
                                    '<input class="form-control" name="name[]" type="text" id="ingredient"' + ingredientCount + placeholder="Ingredient Name"/>'+
                                '</td>'+
                                '<td>'+
                                    '<input class="form-control" name="amount[]" type="text" id="amount"' + ingredientCount + 'placeholder="Amount"/>'+
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

    
}
function addStep(){
    
}
function deleteStep(){
    
}