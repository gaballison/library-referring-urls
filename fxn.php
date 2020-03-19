<?php
	
	// fetch the query string from the URL
	$query = $_SERVER['QUERY_STRING'];
	
	function checkDBCode($tq) {		// this function will check the regex for the db code
		
		// pattern to check the database query code is 3 letters
		$dbPattern = "/^db=([a-z]{3})$/";
		// empty variable
		$dbCode = "";
		// clean the form input before analyzing it
		$testquery = test_input($tq);
		
		// test the cleaned database query code against the regex pattern
		if(preg_match($dbPattern,$testquery,$ccMatches)) {
			$dbCode = $ccMatches[1];
		} else {
			$dbCode = "nada";
		}

		// return the query code
		return $dbCode;
	}
	
	// basic function to clean form input
	function test_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
	
?>
