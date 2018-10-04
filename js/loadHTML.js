$(document).ready(function(){ 
	
	$(function(){
	  $("#header").load("header.html"); 
	  $("#footer").load("footer.html"); 
	});
	getCurrentSession();
});


function getCurrentSession(){
	$.ajax({
		url: 'php/login.php',
		type: 'post',
		data: {"callGetSession":""},
		success: function(data){
			if (data!="fail"){
				console.log(data);
			}
		},
		error: function(data){
			console.log("error");
		}
	});
}