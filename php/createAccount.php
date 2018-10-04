<?php
	

	if (isset($_POST['callCreateAccount'])) {
		$inputArray = explode(':', $_POST['callCreateAccount']);
        checkAccount($inputArray[0],$inputArray[1],$inputArray[2]);
    }

	function checkAccount ($phone,$username,$password){
		include 'connect.php';
		$statement = $session->prepare('SELECT username FROM publisher WHERE username = ?');

		$result = $session->execute($statement, new Cassandra\ExecutionOptions(array(
			'arguments' => array($username)
		)));

		if ($result->count()>0){
			echo "fail";
		} else {
			$statement = $session->prepare('INSERT INTO publisher (username,password,phone) VALUES (?,?,?)');

			$result = $session->execute($statement, new Cassandra\ExecutionOptions(array(
				'arguments' => array($username,$password,$phone)
			)));
			session_start();
			$_SESSION['username'] = $username;

			echo "success";
			
		}
	}
	
?>