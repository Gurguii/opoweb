<?php
namespace App;
include "Config.php";
/**
 * SQLite connnection
 */
class SQLiteConnection {
    /**
     * PDO instance
     * @var type 
     */
    private $pdo;

    /**
     * return in instance of the PDO object that connects to the SQLite database
     * @return \PDO
     */
    public function connect() {
        if ($this->pdo == null) {
            $this->pdo = new \PDO("sqlite:" . Config::DB_PATH);
        }
        return $this->pdo;
    }

    public function createTable(){
        $commands = ['CREATE TABLE IF NOT EXISTS projects (
                        project_id   INTEGER PRIMARY KEY,
                        project_name TEXT NOT NULL
                      )',
            'CREATE TABLE IF NOT EXISTS tasks (
                    task_id INTEGER PRIMARY KEY,
                    task_name  VARCHAR (255) NOT NULL,
                    completed  INTEGER NOT NULL,
                    start_date TEXT,
                    completed_date TEXT,
                    project_id VARCHAR (255),
                    FOREIGN KEY (project_id)
                    REFERENCES projects(project_id) ON UPDATE CASCADE
                                                    ON DELETE CASCADE)'];
        foreach($commands as $command){
            $this->pdo->exec($command);	
        }
        
    }
};

?>