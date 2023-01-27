
<?php
/*COIS 3420H ASSIGNMENT 3 Q2 - W2021 - KESHANI SILVA*/ 

/***********************************************************************************/
/*                          GET DATA FOR HIGHSCORES TABLE                          */
/***********************************************************************************/

//SET UP DATABASE CONNECTION
include "library.php";
$pdo = connectDB();

//HEADERS
header('Access-Control-Allow-Origin: *');
header("Content-Type:application/json");

//USE PDO QUERY TO GET NAME AND WINS IN DESCENDING ORDER FROM DB
$query = "SELECT name, wins FROM `cois3420_a2q2_players` ORDER BY wins DESC";
$stmt = $pdo->query($query); 

//INSERT DATABASE ROW VALUES INTO AN ARRAY
//Array for a single database row
$data = array(); 
//Array for all database rows
$dataset = array(); 
foreach($stmt as $row){
    $data['getname'] = $row['name']; 
    $data['getscore'] = $row['wins'];
    $dataset[] = $data; 
}
//Include only top 6 results into an array
$top6 = [$dataset[0], $dataset[1], $dataset[2], $dataset[3], $dataset[4], $dataset[5]]; 

//ENCODE ARRAY INTO JSON FORMAT AND ECHO
echo json_encode($top6, JSON_PRETTY_PRINT);

//ref:https://poanchen.github.io/blog/2016/10/16/how-to-create-simple-rest-api-in-php-and-call-them-in-js
?>


