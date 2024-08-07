<?php
include "SQLiteConnection.php";
include "Utils.php";

$conn = new App\SQLiteConnection();
$pdo = $conn->connect("sqlite" . App\Config::DB_PATH);

if($pdo == null){
	printf("Couldn't connect to the database\n");
	return;
}

printf("Creating tables...\n");
$conn->createTable();
printf("Tables created");
printf("%s", Utils\generateHTML("gurguito"));
printf("%s", Utils\generateButton("buttonID", "click me¡", "buttonCLASS"));
?>