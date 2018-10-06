$(document).ready(function(){ 

     var loading = $(function(){
      $("#header").load("header.html"); 
      $("#footer").load("footer.html"); 
	});

	
	
	
	$.when(loading ).done(function() {
		
		getCurrentSession();
		
	var pathname = window.location.pathname;
	
	if(pathname.includes("result")||pathname.includes("recipe")){
		loadRecipe();
	}
	});
});


function getCurrentSession(){
	/*$.ajax({
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
	});*/
}

function search(){
	var keyword = $("#searchBar").val();
	window.location.href = "result.html?title="+keyword;
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}