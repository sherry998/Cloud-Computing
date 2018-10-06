var originalStep = document.getElementById('step1');
var step = document.getElementById('stepContainer');
var stepList = [];
var num = 1;
var stepId;

//https://bootsnipp.com/snippets/nPbXv
$(document).ready(function() {
    //Disable the Remove Button
    var rowCount = $('table >tbody:last >tr').length;
    if(rowCount == 1) {
        document.getElementsByClassName('btn-remove')[0].disabled = true;
    }
    
    $(document).on('click', '.btn-add', function(e) {
        e.preventDefault();
        
        var controlForm = $('table');
        var currentEntry = $('table>tbody>tr:last');
        var newEntry = $(currentEntry.clone()).appendTo(controlForm);
        newEntry.find('input').val('');                                         //Remove the Data - as it is cloned from the above
        
        //Add the button  
        var rowCount = $('table >tbody:last >tr').length;
        if(rowCount > 1) {
            var removeButtons = document.getElementsByClassName('btn-remove');
            for(var i = 0; i < removeButtons.length; i++) {
                removeButtons.item(i).disabled = false;
            }
        }
         
    }).on('click', '.btn-remove', function(e) {
        $(this).parents('tr:first').remove();
        
        //Disable the Remove Button
        var rowCount = $('table >tbody:last >tr').length;
        if(rowCount == 1) {
            document.getElementsByClassName('btn-remove')[0].disabled = true;
        }

        e.preventDefault();
        return false;
    });


   
});

function setNum(value){
	num = value;
	console.log(num);
	for (var i=2; i<=value; i++){
		stepList.push("step"+i);
	}
	console.log(stepList);
}

function duplicate() {
	//https://stackoverflow.com/questions/4427094/how-can-i-duplicate-a-div-onclick-with-javascript
    var clone = originalStep.cloneNode(true); // "deep" clone
    clone.id = "step" + ++num;
	stepList.push(clone.id);
    step.appendChild(clone);
	
	$('#'+clone.id).children("h3").children("b").text("Step " + num);
	// clean value
	$('#'+clone.id).children(".form-inline").children("input").val("");
	$('#'+clone.id).children(".form-inline").children("input").css("borderColor","#cccccc");
	$('#'+clone.id).children(".form-inline").children("input").attr("name", "title"+num);
	$('#'+clone.id).children(".form-group").children("textarea").val("");
	$('#'+clone.id).children(".form-group").children("textarea").css("borderColor","#cccccc");
	$('#'+clone.id).children(".form-group").children("textarea").attr("name", "content"+num);
	$('#'+clone.id).children(".form-inline").children(":file").attr("name", "image-upload"+num+"[]");
	$('#'+clone.id).children(".form-inline").children(":file").attr("id", "image-upload"+num);
	$('#'+clone.id).children(".form-inline").children("label").attr("for", "image-upload"+num);
	$('#'+clone.id).children(".imagePreview").attr("id", "preview"+num);
	$('#'+clone.id).children(".imagePreview").empty();
	$('#'+clone.id).children(".originalreview").empty();
}

//https://stackoverflow.com/questions/15420558/jquery-click-event-not-working-after-append-method
//Use the .on() method to delegate the click event to (future) elements dynamically added to the DOM
$('#stepContainer').on('click', '.delete',function(){
	var deletedStep =$(this).parent().parent(); 
	stepList.splice(stepList.indexOf(deletedStep.attr('id')),1);
	deletedStep.remove();
	updateStepInfo();
});

function updateStepInfo(){
	//console.log("run");
	for (var i=0;i<stepList.length;i++){
		$('#'+stepList[i]).children("h2").text("Step " + (i+1));
		$('#'+stepList[i]).attr('id', "step"+ (i+1));
		stepList[i] = "step"+ (i+1);
	}
	num = stepList.length;
}


function updateId(id){
	stepId = id;
}


function createStepInfo(){
	for (var i=0;i<stepList.length;i++){
		var inputObject = $('#'+stepList[i]).children(".form-inline").children("input");
		var textAreaObject = $('#'+stepList[i]).children(".form-group").children("textarea");
		var input = $(inputObject).val();
		var textArea = $(textAreaObject).val();
		$(inputObject).css("borderColor","#cccccc");
		$(textAreaObject).css("borderColor","#cccccc");
		if (!checkStep(input)){
			$(inputObject).css("borderColor","#e29c9c");
			$('html, body').animate({ scrollTop: $(inputObject).offset().top-100 }, 'fast');
			return false;
		} else if (!checkStep(textArea)){
			$(textAreaObject).css("borderColor","#e29c9c");
			$('html, body').animate({ scrollTop: $(textAreaObject).offset().top-100 }, 'fast');
			return false;
		}
	}
	return true;
	
}


