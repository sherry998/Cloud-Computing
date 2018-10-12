<?php

session_start();
include("error.php");

	if (isset($_POST['callGetRecipeInfo'])) {
		
		$inputArray = explode(':', $_POST['callGetRecipeInfo']);
		$filterArray = "empty";
		if (count($inputArray)>3 && $inputArray[2]=="filter"){
		    $filters = explode(',', $inputArray[3]);
			if (count($filters)>0 || $filters!=null){
				$filterArray = addFilter($filters);
			}
		}
		if ($inputArray[0]=="title"){
			getRecipeByName($inputArray[1],$filterArray);
		} else if ($inputArray[0]=="nationality"){
			getRecipeByNation($inputArray[1],$filterArray);
		} else if ($inputArray[0]=="id"){
            getRecipeById($inputArray[1]);
        } else if ($inputArray[0]=="get"){
			getAllRecipe($filterArray);
        }
    }

    if (isset($_POST['callDelete'])) {
        delete($_POST['callDelete']);
    }

    if (isset($_POST['callAddRating'])) {
        addRating($_POST['callAddRating']);
    }

    function addFilter($filterArray){
		include 'connect.php';
        $whereStatement = "";
        for ($i = 0;$i<count($filterArray);$i++){
            if ($i!=0){
                $whereStatement =$whereStatement . ",";
            }
            $whereStatement =$whereStatement . "?";
        }
		
        $statement = $session->prepare('SELECT * FROM ingredients WHERE ingredientname in ('.$whereStatement.')');

        $result = $session->executeAsync($statement, new Cassandra\ExecutionOptions(array(
            'arguments' => $filterArray
        )));
        $resultArray = array();
        foreach ($result as $row) {
            if (!in_array($row['recipeid']->__toString(), $resultArray)){
                array_push($resultArray, $row['recipeid']->__toString());
            }
        }

        return $resultArray;
    }

	function getRecipeByName ($name,$filterArray){
		include 'connect.php';
		$statement = $session->prepare('SELECT * FROM recipebyname WHERE name = ?');

		$result = $session->execute($statement, new Cassandra\ExecutionOptions(array(
			'arguments' => array($name)
		)));
		
		getResult($result,$filterArray);
	}
	
	function getRecipeByNation ($nationality,$filterArray){
		include 'connect.php';
		$statement = $session->prepare('SELECT * FROM recipebynationality WHERE nationality = ?');

		$result = $session->execute($statement, array(
			'arguments' => array($nationality)
		));

		getResult($result,$filterArray);
	}

	function getAllRecipe ($filterArray){
		include 'connect.php';
		$statement = $session->prepare('SELECT * FROM recipe');

		$result = $session->execute($statement);

		getResult($result,$filterArray);
	}

	function getRecipeById ($id){
		include 'connect.php';
		$statementRecipe = $session->prepare('SELECT * FROM recipe WHERE recipeid = ?');
		
		
		$id =  new Cassandra\Uuid($id);
		$resultRecipe = $session->executeAsync($statementRecipe, array(
			'arguments' => array($id )
		))->get();

		$statementIngredient = $session->prepare('SELECT * FROM ingredientused WHERE recipeid = ?');

		$resultIngredient = $session->executeAsync($statementIngredient,array(
			'arguments' => array($id)
		))->get();

		$statementStep = $session->prepare('SELECT * FROM steps WHERE recipeid = ?');

    	$resultStep = $session->executeAsync($statementStep, array(
    		'arguments' => array( $id )
    	))->get();

        $statementRating = $session->prepare('SELECT * FROM rating WHERE recipeid = ?');

    	$resultRating = $session->executeAsync($statementRating, array(
    		'arguments' => array( $id )
    	))->get();

    	getEveryThing($resultRecipe,$resultIngredient,$resultStep,$resultRating);
    }
	
	function getResult($result,$filterArray){
		$json;
		if ($filterArray!= "empty"&& count($filterArray) == 0){
			echo json_encode("");
		} else {
			if ($result->count()>=1 ){
				$count=1;
				foreach ($result as $row) {
					if ($filterArray == "empty" || (in_array($row['recipeid']->__toString(), $filterArray)) ){
						$json[$count] = array (
                            "id" => $row['recipeid']->__toString(),
							"title" => $row['name'],
							"cost" => $row['cost'],
							"date" => $row['date']->toDateTime (),
							"diffculty" => $row['diffculty'],
							"image" => $row['image'],
							"nationality" => $row['nationality'],
							"minute" => $row['minute'],
							"hour" => $row['hour'],
							"username" => $row['username'],
						);
						$count+=1;
					}
				}
				echo json_encode($json);
			} else{
				echo json_encode("");
			}
		}
	}

	function getEveryThing($resultRecipe,$resultIngredient,$resultStep,$statementRating){
        $json;
        $user= null;
       
        if(isset($_SESSION['username']) && !empty($_SESSION['username'])) {
            $user = $_SESSION['username'];
        }
        $rating = 0;
        if ($statementRating->count()==1){
            $row = $statementRating->first();
            $rating = $row['rating']->value();
        }

        if ($resultRecipe->count()==1){
            $row = $resultRecipe->first();
            $json["id"] = $row['recipeid'];
            $json["title"] = $row['name'];
            $json["cost"] = $row['cost'];
            $json["date"] = $row['date']->toDateTime ();
            $json["diffculty"] = $row['diffculty'];
            $json["image"] = $row['image'];
            $json["nationality"] = $row['nationality'];
            $json["hour"] = $row['hour'];
			$json["minute"] = $row['minute'];
            $json["username"] = $row['username'];
			$json["owner"] = false;

            if ($row['username'] == $user){
                $json["owner"] = true;
            }

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

    function delete($id){
        include 'connect.php';
        $id =  new Cassandra\Uuid($id);
        $statement = $session->prepare('DELETE FROM recipe WHERE recipeid = ?');

        $session->execute($statement, array(
            'arguments' => array($id)
        ));

        $statementStep = $session->prepare('DELETE FROM steps WHERE recipeid = ?');

        $session->execute($statementStep, array(
             'arguments' => array($id)
        ));

        $statementIngredient = $session->prepare('DELETE FROM ingredientused WHERE recipeid = ?');

        $session->execute($statementIngredient, array(
            'arguments' => array($id)
        ));
		
		$statementRating = $session->prepare('DELETE FROM rating WHERE recipeid = ?');

        $session->execute($statementRating, array(
            'arguments' => array($id)
        ));
		
    }

    function addRating($id){
        include 'connect.php';
        $id =  new Cassandra\Uuid($id);
        $statement = $session->prepare('UPDATE rating SET rating = rating + 1 WHERE recipeid = ?');

        $session->execute($statement, array(
            'arguments' => array($id)
        ));
    }
	
?>