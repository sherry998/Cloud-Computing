<?php
	

	if (isset($_POST['callGetRecipeInfo'])) {
		$inputArray = explode(':', $_POST['callGetRecipeInfo']);
		if ($inputArray[0]=="title"){
			getRecipeByName($inputArray[1]);
		} else if ($inputArray[0]=="nationality"){
			getRecipeByNation($inputArray[1]);
		}
    }

	function getRecipeByName ($name){
		include 'connect.php';
		$statement = $session->prepare('SELECT * FROM recipebyname WHERE name = ?');

		$result = $session->execute($statement, new Cassandra\ExecutionOptions(array(
			'arguments' => array($name)
		)));
		
		getResult($result);
	}
	
	function getRecipeByNation ($nationality){
		include 'connect.php';
		$statement = $session->prepare('SELECT * FROM recipebynationality WHERE nationality = ?');

		$result = $session->execute($statement, new Cassandra\ExecutionOptions(array(
			'arguments' => array($nationality)
		)));
		
		getResult($result);
	}
	
	function getResult($result){
		$json;
		if ($result->count()>=1){
			$count=1;
			foreach ($result as $row) {
				$json[$count] = array (
					"title" => $row['name'],
					"cost" => $row['cost']->value(),
					"date" => $row['date']->toDateTime (),
					"diffculty" => $row['diffculty'],
					"image" => $row['image'],
					"nationality" => $row['nationality'],
					"time" => $row['time']->value(),
					"username" => $row['username'],
					"rating" => $row['rating'],
				);
				$count+=1;
			}
			echo json_encode($json);
		} else{
			echo json_encode("");
		}
	}
	
?>