<?php

class User{
	public string $name;
	public string $surname;

	public function __construct(string $name, string $surname){
		$this->name = $name;
		$this->surname = $surname;
	}

	public function printMe(){
		printf("==\nname: %s\nsurname: %s\n==\n", $this->name, $this->surname);
	}
};

$a = new User("gurgui", "gomez");
$a->printMe();
?>