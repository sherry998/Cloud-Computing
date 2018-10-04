function checkInput(){
	var phone = $('#inputPhone').val();
	var username = $('#inputUsername').val();
	var psw = $('#inputPassword').val();
	var pswConfirm = $('#confirmPassword').val();

	if (username == "" || username == null || psw == "" || psw == null){
		$( "#error" ).text("Password or username cannot be empty.");
		$( ".errorMessage" ).css( "display", "block" );
	} else if (/^[a-zA-Z0-9- ]*$/.test(username) == false ||
		/^[a-zA-Z0-9- ]*$/.test(psw) == false){
		$( "#error" ).text("Special characters not allowed");
		$( ".errorMessage" ).css( "display", "block" );
	} else if (psw!=pswConfirm){
		$( "#error" ).text("Password is not the same.");
		$( ".errorMessage" ).css( "display", "block" );
	} else {
		$( ".errorMessage" ).css( "display", "none" );
		var input = phone + ":" + username + ":" + psw;
		$.ajax({
			url: 'php/createAccount.php',
			type: 'post',
			data: {"callCreateAccount":input},
		success: function(data){
			console.log(data);
			if (data == "sucess"){
				// to be changed
				window.location.href = 'index.html';
			} else {
				$( "#error" ).text("Username already exists, please choose another.");
				$( ".errorMessage" ).css( "display", "block" );
			}
		
		},
		error: function(data){
			$( "#error" ).text("Something went wrong, please try again later.");
			$( ".errorMessage" ).css( "display", "block" );
		}
		});
	}
}

function checkLogin(){
	var username = $('#inputUsername').val();
	var psw = $('#inputPassword').val();

	if (username == "" || username == null || psw == "" || psw == null){
		$( "#error" ).text("Password or username cannot be empty.");
		$( ".errorMessage" ).css( "display", "block" );
	} else if (/^[a-zA-Z0-9- ]*$/.test(username) == false ||
		/^[a-zA-Z0-9- ]*$/.test(psw) == false){
		$( "#error" ).text("Special characters not allowed");
		$( ".errorMessage" ).css( "display", "block" );
	} else {
		$( ".errorMessage" ).css( "display", "none" );
		var input = username + ":" + psw;
		$.ajax({
			url: 'php/login.php',
			type: 'post',
			data: {"callLogin":input},
		success: function(data){
			console.log(data);
			if (data == "success"){
				// to be changed
				window.location.href = 'index.html';
			} else {
				$( "#error" ).text("Username or password incorrect.");
				$( ".errorMessage" ).css( "display", "block" );
			}
		},
		error: function(data){
			$( "#error" ).text("Something went wrong, please try again later.");
			$( ".errorMessage" ).css( "display", "block" );
		}
		});
	}
}

function logout(){
	$.ajax({
		url: 'php/login.php',
		type: 'post',
		data: {"callLogout":""},
		success: function(data){
			window.location.href = 'index.html';
		},
		error: function(data){
			console.log("error");
		}
	});
}

