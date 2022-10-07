CREATE DATABASE teachers_db;

use teachers_db;

CREATE TABLE teachers (
    id integer(11) UNSIGNED AUTO_INCREMENT,
    first_name varchar(255),
    last_name varchar(255),
    grade varchar(30),
    registration_number bigint,
    created_at DATETIME NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
 );
