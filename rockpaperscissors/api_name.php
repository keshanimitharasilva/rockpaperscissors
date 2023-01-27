
<?php
/*COIS 3420H ASSIGNMENT 3 Q2 - W2021 - KESHANI SILVA*/ 

/***********************************************************************************/
/*                           POST DATA TO NAME FORM                                */
/***********************************************************************************/

//SET UP DATABASE CONNECTION
include "library.php";
$pdo = connectDB();

//HEADERS
header('Access-Control-Allow-Origin: *');
header("Content-Type:application/json");

//INITIALIZE AND DECLARE VARIABLES TAKEN FROM FORM
$hsName = $_POST['hsName'] ?? ""; 
$plays = $_POST['plays'] ?? 0; 
$wins = $_POST['wins'] ?? 0; 
$losses = $_POST['losses'] ?? 0; 

//USE PDO QUERY TO INSERT FORM VALUES INTO DATABASE
$query = "INSERT INTO `cois3420_a2q2_players`(`name`, `plays`, `wins`, `losses`) VALUES(?,?,?,?)";
$stmt=$pdo->prepare($query) ->execute([$hsName, $plays, $wins,$losses]);

?>