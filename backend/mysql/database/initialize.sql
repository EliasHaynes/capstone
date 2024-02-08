CREATE DATABASE capstone;
USE capstone;

-- DROP TABLE IF EXISTS users, vehicles, repairLog;

CREATE TABLE IF NOT EXISTS users (
	id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL UNIQUE KEY
);

CREATE TABLE IF NOT EXISTS vehicles (
	v_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100),
    v_ymm VARCHAR(100),
    v_trim VARCHAR(50),
    v_engine VARCHAR(50),
    v_transmission VARCHAR(50),
    vin VARCHAR(50) UNIQUE KEY,
    mileage INT NOT NULL,
    currentVProfile BOOLEAN,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS repairLog (
	repair_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    v_id INT NOT NULL,
    repair_mileage INT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    maintenance VARCHAR(200),
    performed_by VARCHAR(50),
    contact VARCHAR(50),
    material INT,
    labor INT,
    other INT,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(v_id) REFERENCES vehicles(v_id)
);