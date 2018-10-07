<?php
	

	if (isset($_POST['callGetRecipeInfo'])) {
		$inputArray = explode(':', $_POST['callGetRecipeInfo']);
		if ($inputArray[0]=="title"){
			getRecipeByName($inputArray[1]);
		} else if ($inputArray[0]=="nationality"){
			getRecipeByNation($inputArray[1]);
		} else if ($inputArray[0]=="id"){
            getRecipeById($inputArray[1]);
        } else if ($inputArray[0]=="get"){
             getAllRecipe();
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

	function getAllRecipe (){
    		include 'connect.php';
    		$statement = $session->prepare('SELECT * FROM recipe');

    		$result = $session->execute($statement);

    		getResult($result);
    	}

	function getRecipeById ($id){
    		include 'connect.php';
    		$statementRecipe = $session->prepare('SELECT * FROM recipe WHERE recipeid = ?');

            $id =  new Cassandra\Uuid($id);
    		$resultRecipe = $session->execute($statementRecipe, new Cassandra\ExecutionOptions(array(
    			'arguments' => array($id )
    		)));

            $statementIngredient = $session->prepare('SELECT * FROM ingredientused WHERE recipeid = ?');

    		$resultIngredient = $session->execute($statementIngredient, new Cassandra\ExecutionOptions(array(
    			'arguments' => array($id)
    		)));

            $statementStep = $session->prepare('SELECT * FROM steps WHERE recipeid = ?');

    		$resultStep = $session->execute($statementStep, new Cassandra\ExecutionOptions(array(
    			'arguments' => array( $id )
    		)));

    		getEveryThing($resultRecipe,$resultIngredient,$resultStep);
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

	function getEveryThing($resultRecipe,$resultIngredient,$resultStep){
        $json;
        if ($resultRecipe->count()==1){
            $row = $resultRecipe->first();
            $json["title"] = $row['name'];
            $json["cost"] = $row['cost']->value();
            $json["date"] = $row['date']->toDateTime ();
            $json["diffculty"] = $row['diffculty'];
            $json["image"] = $row['image'];
            $json["nationality"] = $row['nationality'];
            $json["time"] = $row['time']->value();
            $json["username"] = $row['username'];
            $json["rating"] = $row['rating'];

            $ingredientCount =1;
            foreach ($resultIngredient as $rowIngredient) {
                $json["ingredient"][$ingredientCount] = array (
					"name" => $rowIngredient['ingredientname'],
					"amount" => $rowIngredient['amount'],
				);
				$ingredientCount+=1;
            }

            $stepCount =1;
            foreach ($resultStep as $rowStep) {
                $json["step"][$stepCount] = array (
					"content" => $rowStep['content'],
					"image" => $rowStep ['image'],
				);
				$stepCount+=1;
            }
    		echo json_encode($json);
        } else{
            echo json_encode("");
        }
    }
	
?>