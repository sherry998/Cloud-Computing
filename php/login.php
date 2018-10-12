<?php
	

	if (isset($_POST['callLogin'])) {
		$inputArray = explode(':', $_POST['callLogin']);
        login($inputArray[0],$inputArray[1]);
    }

	if (isset($_POST['callLogout'])) {
        logout();
    }

	if (isset($_POST['callGetSession'])) {
		session_start();
		if(isset($_SESSION['username']) && !empty($_SESSION['username'])) {
			echo ($_SESSION['username']);
		} else {
			echo "fail";
		}
    }

	function login ($username,$password){
		include 'connect.php';
		$statement = $session->prepare('SELECT username FROM publisher WHERE username = ? AND password = ?');

		$result = $session->execute($statement, array(
			'arguments' => array($username,$password)
		));

		if ($result->count()>=1){
			session_start();
			$_SESSION['username'] = $username;
			echo "success";
		} else {
			echo "fail";
		}
	}

	function logout(){
		session_start();
 
		// Unset all of the session variables
		$_SESSION = array();
 
		// Destroy the session.
		session_destroy();
	}
	
?>