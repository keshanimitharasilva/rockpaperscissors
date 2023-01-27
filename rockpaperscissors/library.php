<?php 
// *** COIS 3420H ASSIGNMENT 2 PART 2 
// *** Keshani Silva

// **** GET DOCUMENT AND WEBROOT PATH FROM VIRTUAL DIRECTORIES ****
define('DOCROOT', "/home/keshanisilva/"); 
define('WEBROOT', "/home/keshanisilva/public_html/www_data/"); 

// **** CONNECT TO DATABASE ****
    function connectDB(){

        $config = parse_ini_file(DOCROOT . 'pwd/config.ini'); 
        
        $dsn = "mysql:host=$config[domain];dbname=$config[dbname];charset=utf8mb4";
        $options = [ 
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, $config['username'], $config['password'], $options);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
        return $pdo; 
    }
?>