<?php
	session_start();
	include 'error.php';

	if(isset($_POST['numIngredient'])&& !isset($_POST['id'])){
		createRecipe ($_POST['numIngredient'], $_POST['numSteps']);
	}

	if (isset($_POST['callUpdateGuide'])) {
       updateGuide($_POST['callUpdateGuide']);
    }

	function createRecipe($num,$steps){
		include 'connect.php';
		$title= strtolower($_POST['title']);
		$type = $_POST['type'];
		$hour = (int)$_POST['hour'];
		$minute = (int)$_POST['minute'];
		$level= $_POST['level'];
		$cost= (int)$_POST['cost'];
		$date = new Cassandra\Date(time ());
		$uuid = new Cassandra\Uuid();
		$image = 'recipe_Image/noImage.png';
		
		$featureimage =  $_FILES['main-upload'];
		if ($_FILES['main-upload']['size'] != 0){
			$image = createFeatureImage($featureimage,$uuid);
		}
	
		$username = $_SESSION['username'];
		if ($image!=false){
			$statement = $session->prepare('INSERT INTO recipe (recipeid,name, cost, date, image, hour,minute, nationality,username,diffculty,rating) values (
				?,?,?,?,?,?,?,?,?,?,0)');

			$result = $session->execute($statement, array(
				'arguments' => array($uuid,$title,$cost,$date,$image,$hour,$minute,$type,$username,$level)
			));

			
			for ($i = 1; $i <= $num; $i++) {
				$ingredient = $_POST['ingredient'.$i];
				$amount =  $_POST['amount'.$i];
				createIngredient($ingredient,$amount,$uuid,$session);
			}
			
			for ($i = 1; $i <= $steps; $i++) {
				$content = $_POST['content'.$i];
				$stepimage = 'recipe_Image/noImage.png';
				$actualImage =  $_FILES['image-upload'.$i];
				if ($_FILES['image-upload'.$i]['size'] != 0){
					$stepimage = createStepImage($actualImage,$uuid,$i);
				}
				if ($stepimage!=false){
					createStep($content,$i,$uuid,$session,$stepimage);
				}
			}
			header('Location: ../recipe.html?id='.$uuid);
		}
		
		
	}

	function createFeatureImage($image,$id){
		$imageFileType = getImageType("../recipe_Image/",$image["name"]);

		$target_loc = "recipe_Image/"."RecipeID".$id.".".$imageFileType;

		if (uploadImage($target_loc,$image["tmp_name"])){
			return $target_loc;
		} else {
			return false;
		}
	}
	
	function createStepImage($image,$id,$i){
		$imageFileType = getImageType("../recipe_Image/",$image["name"]);

		$target_loc = "recipe_Image/"."RecipeID".$id."step".$i.".".$imageFileType;

		if (uploadImage($target_loc,$image["tmp_name"])){
			return $target_loc;
		} else {
			return false;
		}	
	}

	function createIngredient($name,$amount,$id,$session){
		$statement = $session->prepare('INSERT INTO ingredientused (recipeid,ingredientname, amount) values (
			?,?,?)');

		$result = $session->execute($statement, array(
			'arguments' => array($id,$name,$amount)
		));
	}
	
	function createStep($content,$i,$id,$session,$image){
		$statement = $session->prepare('INSERT INTO steps (recipeid,stepnum, content, image) values (
			?,?,?,?)');

		$result = $session->execute($statement, array(
			'arguments' => array($id,$i,$content,$image)
		));
	}
	
	
	function uploadImage($target_loc,$image){
		if (move_uploaded_file($image, "../".$target_loc)) {
			//echo $target_loc;
			return true;
		} else {
			echo "Not uploaded because of error #".$_FILES["main-upload"]["error"];
			echo "Sorry, there was an error uploading your file.";
			return false;
		}
	}
	
	function getImageType($target_dir,$image){
		$target_file = $target_dir . basename($image);
		$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
		return $imageFileType;
	}
?>
<!DOCTYPE html>
<html>
<body>
<!-- https://dribbble.com/shots/3266490-Food-Loader-GIF-Animation-->
<img src="../img/loader-2_food.gif" style=" width:20%; position: fixed;
  top: 45%;
  left: 53%;
  transform: translate(-45%, -53%);"/>
</body>
</html>

